import { Router } from 'express';
import UserController from '../controllers/user';

const router = Router();

router.post('/register', UserController.register);
router.post('/signin', UserController.signIn);

export default router;
