import express from 'express';
import loginRouter from './database/routes/auth';
import userRouter from './database/routes/users';
import boardRouter from './database/routes/board';
import columnsRouter from './database/routes/columns';
import cardsRouter from './database/routes/cards';
import commentsRouter from './database/routes/comment';
import notificationsRouter from './database/routes/notifications';
import cors from 'cors';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    // ...
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header("Access-Control-Allow-Headers", "X-Requested-With, content-type");
      res.header("Access-Control-Allow-Headers", "*");
      next();
    };

    this.app.use(cors());
    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use('/auth', loginRouter);
    this.app.use('/user', userRouter);
    this.app.use('/board', boardRouter);
    this.app.use('/columns', columnsRouter);
    this.app.use('/cards', cardsRouter);
    this.app.use('/comments', commentsRouter);   
    this.app.use('/notifications', notificationsRouter); 
  }

  public start(PORT: string | number): void {

    this.app.listen(PORT);
  }
}

export { App };

export const { app } = new App();
