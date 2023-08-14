import { Router } from 'express';
import Notifications from '../controllers/notifications';

const router: Router = Router();

router.get('/', new Notifications().getAllNotifications);
router.patch('/:id', new Notifications().markAsRead);

export default router;