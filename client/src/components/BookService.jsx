import React, { useState } from 'react';

const BookService = () => {
  const [formData, setFormData] = useState({
    userId: '',
    serviceId: '',
    date: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Booking successful!');
        setFormData({ userId: '', serviceId: '', date: '' });
      } else {
        setMessage(`Error: ${data.error}`);
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage('Failed to book service.');
    }
  };

  return (
    <div>
      <h2>Book a Service</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input type="text" name="userId" value={formData.userId} onChange={handleChange} required />

        <label>Service ID:</label>
        <input type="text" name="serviceId" value={formData.serviceId} onChange={handleChange} required />

        <label>Date:</label>
        <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} required />

        <button type="submit">Book</button>
      </form>
    </div>
  );
};

export default BookService;
