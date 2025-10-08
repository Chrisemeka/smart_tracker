import { Router } from "express";
import { RecordController } from "../controllers/RecordController";
import { validateAuth } from "../middleware/validateAuth";

const router = Router();

router.get('/:id', validateAuth, RecordController.getRecordDetail);
router.put('/update/:id', validateAuth, RecordController.updateRecord);
router.delete('/delete/:id', validateAuth, RecordController.deleteRecord);

export default router;