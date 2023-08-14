import { Router } from 'express';
import Columns from '../controllers/columns';

const router: Router = Router();

router.get('/', new Columns().getColumnByBoardId);
router.get('/:id', new Columns().getColumnById);
router.post('/create', new Columns().create);
router.patch('/edit/:id', new Columns().update);
router.delete('/delete/:id', new Columns().delete);


export default router;