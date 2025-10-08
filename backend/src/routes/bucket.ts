import { Router } from 'express';
import { BucketController } from '../controllers/BucketController';
import { validateAuth } from '../middleware/validateAuth';

const router = Router();

router.get('/', validateAuth, BucketController.getBuckets);
router.get('/:id', validateAuth, BucketController.getBucketById);
router.post('/create', validateAuth, BucketController.createBucket);
router.put('/update/:id', validateAuth, BucketController.updateBucket);
router.get('/:id/records', validateAuth, BucketController.getRecordInBucket);
router.post('/:id/records', validateAuth, BucketController.createRecordInBucket);
router.delete('/delete/:id', validateAuth, BucketController.deleteBucket);

export default router;