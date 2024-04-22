import { Router } from 'express';
import { randomUploadController } from '../controller/randomUploadController';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/api/upload-random', upload.single('file'), randomUploadController);

export default router;
