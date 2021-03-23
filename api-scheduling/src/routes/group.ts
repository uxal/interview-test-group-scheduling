import { Router } from 'express';
import GroupController from '../controllers/group';
import CalendarSlotController from '../controllers/calendarSlot';

const router = Router();

router.get('/', GroupController.get);
router.post('/', GroupController.post);
router.get('/:groupId/calendarSlot', CalendarSlotController.getSlots);
router.post('/:groupId/calendarSlot', CalendarSlotController.saveOption);

export default router;
