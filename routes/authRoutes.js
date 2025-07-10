import express from 'express';
import { register, login, getAllUsers } from '../controllers/authController.js';

const router = express.Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/users', getAllUsers); // 👈 this is the new route

export default router;

