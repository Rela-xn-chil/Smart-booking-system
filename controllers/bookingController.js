import db from '../models/index.js';

const { Booking, User, Service } = db;

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { date, userId, serviceId } = req.body;

    // Validate required fields
    if (!date || !userId || !serviceId) {
      return res.status(400).json({ 
        error: 'Date, userId, and serviceId are required' 
      });
    }

    // Check if service exists
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create the booking
    const booking = await Booking.create({
      date: new Date(date),
      userId,
      serviceId
    });

    // Fetch the booking with associated data
    const bookingWithAssociations = await Booking.findByPk(booking.id, {
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Service, attributes: ['id', 'name', 'description', 'category', 'price'] }
      ]
    });

    res.status(201).json(bookingWithAssociations);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

// Get all bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Service, attributes: ['id', 'name', 'description', 'category', 'price'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

// Get bookings by user ID
export const getBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ error: 'Valid userId is required' });
    }

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch user's bookings
    const bookings = await Booking.findAll({
      where: { userId },
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Service, attributes: ['id', 'name', 'description', 'category', 'price'] }
      ],
      order: [['date', 'DESC']]
    });

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ error: 'Failed to fetch user bookings' });
  }
};