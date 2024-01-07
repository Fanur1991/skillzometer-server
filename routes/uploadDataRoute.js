import { Router } from 'express';
import { uploadData } from '../controllers/uploadDataController.js';

const router = new Router();

// Endpoint для загрузки данных
// http://localhost:3002/api/upload
router.post('/', uploadData);

export default router;
