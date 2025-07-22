// src/config/api.js
const API_BASE_URL = 'https://smart-booking-system-backend.onrender.com';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  
  // User endpoints
  USERS: `${API_BASE_URL}/api/users`,
  USER_BOOKINGS: (userId) => `${API_BASE_URL}/api/users/${userId}/bookings`,
  
  // Service endpoints
  SERVICES: `${API_BASE_URL}/api/services`,
  
  // Booking endpoints
  BOOKINGS: `${API_BASE_URL}/api/bookings`,
};

export default API_BASE_URL;