// src/components/BookService.jsx
import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';

const BookService = () => {
  const [formData, setFormData] = useState({
    userId: '',
    serviceId: '',
    date: '',
  });
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get current user's ID from localStorage
    const currentUserId = localStorage.getItem('userId');
    if (currentUserId) {
      setFormData(prev => ({ ...prev, userId: currentUserId }));
    }

    // Fetch available services
    fetch(API_ENDPOINTS.SERVICES)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch services');
        return res.json();
      })
      .then(data => setServices(data))
      .catch(err => {
        console.error('Error fetching services:', err);
        setMessage('Failed to load services');
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(API_ENDPOINTS.BOOKINGS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          serviceId: parseInt(formData.serviceId),
          date: formData.date
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Booking successful!');
        setFormData(prev => ({ ...prev, serviceId: '', date: '' }));
        
        // Refresh services to update available slots
        fetch(API_ENDPOINTS.SERVICES)
          .then(res => res.json())
          .then(data => setServices(data))
          .catch(console.error);
      } else {
        setMessage(data.message || data.error || 'Failed to book service');
      }
    } catch (error) {
      console.error(error);
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedService = services.find(s => s.id === parseInt(formData.serviceId));

  return (
    <div className="card">
      <h2>Book a Service</h2>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
        Select a service and choose your preferred date and time
      </p>
      
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="serviceId">Select Service</label>
            <select
              id="serviceId"
              name="serviceId"
              value={formData.serviceId}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Choose a service...</option>
              {services.map(service => (
                <option 
                  key={service.id} 
                  value={service.id}
                  disabled={service.availableSlots <= 0}
                >
                  {service.name} ({service.availableSlots} slots available)
                  {service.availableSlots <= 0 ? ' - FULLY BOOKED' : ''}
                </option>
              ))}
            </select>
          </div>

          {selectedService && (
            <div style={{ 
              background: '#f8f9fa', 
              padding: '1rem', 
              borderRadius: '10px', 
              marginBottom: '1rem',
              border: '1px solid #e9ecef'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Service Details</h4>
              <p style={{ margin: '0 0 0.5rem 0', color: '#666' }}>{selectedService.description}</p>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', flexWrap: 'wrap' }}>
                <span><strong>Category:</strong> {selectedService.category}</span>
                <span><strong>Price:</strong> ${selectedService.price}</span>
                <span><strong>Available Slots:</strong> {selectedService.availableSlots}</span>
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="date">Preferred Date & Time</label>
            <input
              id="date"
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-input"
              min={new Date().toISOString().slice(0, 16)} // Prevent past dates
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn"
            disabled={loading || !formData.serviceId || (selectedService && selectedService.availableSlots <= 0)}
          >
            {loading ? 'Booking...' : 'Book Service'}
          </button>
        </form>

        {message && (
          <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookService;