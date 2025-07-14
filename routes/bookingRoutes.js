import express from 'express';
import {
  createBooking,
  getBookings,
  getBookingsByUser // ✅ Add this line
} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/bookings', createBooking);
router.get('/bookings', getBookings);
router.get('/bookings/user/:userId', getBookingsByUser);


export default router;
