import express from 'express';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/admin/dashboard',
  authenticateToken,
  authorizeRole('admin'),
  (req, res) => {
    res.json({ message: `Welcome Admin ${req.user.id}` });
  }
);

export default router;
