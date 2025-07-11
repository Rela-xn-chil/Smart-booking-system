import React, { useState, useEffect } from 'react';

function AddBooking() {
  const [userId, setUserId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState('');
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));

    fetch('http://localhost:3000/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error('Error fetching services:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, serviceId, date })
    });

    if (res.ok) {
      setMessage('✅ Booking created successfully');
      setUserId('');
      setServiceId('');
      setDate('');
    } else {
      setMessage('❌ Failed to create booking');
    }
  };

  return (
    <div>
      <h2>Create Booking</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User:</label>
          <select value={userId} onChange={(e) => setUserId(e.target.value)} required>
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Service:</label>
          <select value={serviceId} onChange={(e) => setServiceId(e.target.value)} required>
            <option value="">Select Service</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>{service.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Date:</label>
          <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <button type="submit">Book</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddBooking;
