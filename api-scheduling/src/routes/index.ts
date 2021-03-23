import { Router } from 'express';
import userRoutes from './user';
import groupRoutes from './group';
import authorizationRequired from '../middleware/authorizationRequired';

const router = Router();

router.use('/user', userRoutes);
router.use('/group', authorizationRequired, groupRoutes);

export default router;
