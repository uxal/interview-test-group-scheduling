import { Router } from 'express';
import UserController from '../controllers/user';
import authorizationRequired from '../middleware/authorizationRequired';

const router = Router();

router.post('/register', UserController.register);
router.post('/signin', UserController.signIn);
router.get('/me', authorizationRequired, UserController.getUserInfo);

export default router;
