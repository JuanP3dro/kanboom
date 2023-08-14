import { Router } from 'express';
import Board from '../controllers/boards';

const router: Router = Router();

router.get('/', new Board().getBoardByUserId);
router.get('/:id', new Board().getBoardById);
router.post('/create', new Board().create);
router.patch('/edit/:id', new Board().update);
router.patch('/:id/edit/role', new Board().updateRoleBoard);
router.post('/:id/invite', new Board().invite);
router.post('/accept', new Board().acceptedInvite);
router.delete('/deletedUser', new Board().removeUserBoard);
router.delete('/delete/:id', new Board().delete);   

export default router;