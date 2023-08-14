import { Router } from 'express';
import Cards from '../controllers/cards';


const router: Router = Router();

router.get('/', new Cards().getCardByColumnId);
router.get('/:id', new Cards().getCardById);
router.post('/create', new Cards().create);
router.patch('/edit/:id', new Cards().update);
router.patch('/move', new Cards().move); 
router.delete('/delete/:id', new Cards().delete);

export default router;