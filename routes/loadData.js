import { Router } from 'express';
import { loadData } from '../controllers/loadData.js';

const router = new Router();

// Endpoint для загрузки данных
// http://localhost:3002/api/load
router.post('/', loadData);

export default router;
