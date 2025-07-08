import express from 'express';
import { adminDashboard } from '../controllers/protectedController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/protected/admin/dashboard.
router.get('/admin/dashboard', authenticateToken, authorizeRole('admin'), adminDashboard);

export default router;
