import { Router, Request, Response, NextFunction } from 'express';
import User from '../controllers/users';
import upload from '../modules/uploadProfilePhoto';
import path from 'path';

const router: Router = Router();

router.get('/:id', new User().getUsers);
router.post('/create', new User().createUser);
router.post('/recovery_password', new User().recoveryPassword);
router.patch('/replace_password/:id', new User().replacePassword);
router.patch('/update/:id', upload.single('profilePhoto'), new User().update);
router.get('/image/:name', (req: Request, res: Response, next: NextFunction) => {
    const options = {
      root: path.join(__dirname, '..', '..', '..', 'src', 'profilePhoto'),
    };
  
    const fileName: string = req.params.name;
    res.sendFile(fileName, options, (err) => {
      if (err) {
        next(err);
      }
    });
  });

export default router;
