import express from 'express';
import { createService, getAllServices } from '../controllers/serviceController.js';

const router = express.Router();

router.post('/services', createService);
router.get('/services', getAllServices);

export default router;
