import { Router } from 'express';
import Auth from '../controllers/auth';

const router: Router = Router();

router.post('/login', new Auth().loginUser);

router.post('/refresh_token', new Auth().refreshToken);

router.patch('/email', new Auth().emailValidation);

router.patch('/steps', new Auth().validateSteps);

export default router;
