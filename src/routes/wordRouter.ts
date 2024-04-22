import { Router } from 'express';
import { wordController } from '../controller/wordController';

const router = Router();

router.get('/api/mirror', wordController);

export default router;
