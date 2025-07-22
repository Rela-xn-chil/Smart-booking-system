import React, { useState, useEffect } from 'react';

function AddBooking() {
  const [userId, setUserId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState('');
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = 'https://smart-booking-system-backend.onrender.com';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const usersResponse = await fetch(`${API_BASE_URL}/api/users`);
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          setUsers(usersData);
        } else {
          console.error('Error fetching users:', usersResponse.statusText);
        }

        // Fetch services
        const servicesResponse = await fetch(`${API_BASE_URL}/api/services`);
        if (servicesResponse.ok) {
          const servicesData = await servicesResponse.json();
          setServices(servicesData);
        } else {
          console.error('Error fetching services:', servicesResponse.statusText);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json'
      };

      // Add authorization header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ 
          userId: parseInt(userId), 
          serviceId: parseInt(serviceId), 
          date 
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Booking created successfully!');
        setUserId('');
        setServiceId('');
        setDate('');
        
        // Refresh services to update available slots
        const servicesResponse = await fetch(`${API_BASE_URL}/api/services`);
        if (servicesResponse.ok) {
          const servicesData = await servicesResponse.json();
          setServices(servicesData);
        }
      } else {
        setMessage(data.error || data.message || 'Failed to create booking');
      }
    } catch (err) {
      console.error('Network error:', err);
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Create New Booking</h2>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
        Book a service for any user in the system
      </p>
      
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userId">Select User</label>
            <select
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Choose a user...</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="serviceId">Select Service</label>
            <select
              id="serviceId"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Choose a service...</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name} - ({service.availableSlots || 0} slots available)
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Booking Date & Time</label>
            <input
              id="date"
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-input"
              min={new Date().toISOString().slice(0, 16)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn"
            disabled={loading}
          >
            {loading ? 'Creating Booking...' : 'Create Booking'}
          </button>
        </form>

        {message && (
          <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddBooking;