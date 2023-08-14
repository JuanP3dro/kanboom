import { Router, Request, Response } from 'express';
import Comment from '../controllers/comments';
import { bucket } from '../modules/firebase';
import Comments from '../models/comments';
import upload from '../modules/multer';
import axios from 'axios';
import { IComments } from '../interfaces/IComments';
import Notifications from '../models/notifications';
import Cards from '../models/cards';
import UserNotifications from '../models/userNotifications';
import { allowedUsers } from "../interfaces/ICards";

const router: Router = Router();

router.get('/', new Comment().getColumnByCardId);
router.post('/create', new Comment().create);
router.post('/upload', upload.single('attachment'), async (req: Request, res: Response) => {
  try {
    const { cardId, author, comment, allowedUsers } = req.body as IComments;
    const file = req.file;
    let url: any;

    if(!allowedUsers) return res.status(404).send(`allowed users can't be null`)

    const allowedUsersJson = allowedUsers as unknown as string; 
    const allowedUsersArray = JSON.parse(allowedUsersJson) as allowedUsers[];
    const allowedUsersIds = allowedUsersArray.map(u => u.id);

    if (!file) {
      await Comments.create({ cardId, author, comment });

      const Card = await Cards.findByPk(cardId);
      const name = Card?.title;

      const notifications = await Notifications.create({ text: `Um comentario no Card ${name} foi criado` });
      const notificationId = notifications.id;
      allowedUsersIds.map(async (u: any) => await UserNotifications.create({ userId: u, notificationId }));
      return res.status(200).send();
    }

    const fileName = file.originalname;
    const fileUpload = bucket.file(fileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (error) => {
      console.error('Erro ao fazer o upload do arquivo:', error);
      return res.status(500).json({ error: 'Erro ao fazer o upload do arquivo.' });
    });

    blobStream.on('finish', async () => {

      await fileUpload.makePublic();
      url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      await Comments.create({ cardId, author, comment, attachment: fileName });

      const Card = await Cards.findByPk(cardId);
      const name = Card?.title;

      const notifications = await Notifications.create({ text: `Um comentario no Card ${name} foi criado` });
      const notificationId = notifications.id;
      allowedUsersIds.map(async (u: any) => await UserNotifications.create({ userId: u, notificationId }));
      return res.status(200).json({ url: url });
    });

    blobStream.end(file.buffer);

  } catch (error) {

    console.log(error);
  }

});
router.get('/download/:filename', async (req: Request, res: Response) => {
  try {
    const { filename } = req.params;

    if (filename) {

      const ext = filename.split('.').pop()?.toLocaleLowerCase();

      const [url] = await bucket.file(filename).getSignedUrl({
        action: 'read',
        expires: '03-09-2025', // Define a data de expiração do link de download (opcional)
      });

      const response = await axios.get(url, { responseType: 'arraybuffer' });

      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
      res.setHeader('Content-Type', response.headers['content-type']);
      res.setHeader('Content-Length', response.headers['content-length']);
      res.send(response.data);
    }
  } catch (error) {
    console.log(error);
  }
})

export default router;