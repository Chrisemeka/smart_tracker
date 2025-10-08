import { Router } from 'express';
import { AiController } from '../controllers/AiController';

const router = Router();

router.post('/suggest-fields', AiController.getBucketFields);

export default router;