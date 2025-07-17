import React, { useState, useEffect } from 'react';

function AddBooking() {
  const [userId, setUserId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState('');
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch users
    fetch('http://localhost:3000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));

    // Fetch services
    fetch('http://localhost:3000/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error('Error fetching services:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('http://localhost:3000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, serviceId, date })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Booking created successfully!');
        setUserId('');
        setServiceId('');
        setDate('');
      } else {
        setMessage(data.error || 'Failed to create booking');
      }
    } catch (err) {
      console.error(err);
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
                  {service.name} - ${service.price} ({service.availableSlots} slots available)
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