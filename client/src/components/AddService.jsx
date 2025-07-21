import React, { useState } from 'react';

const AddService = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    availableSlots: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');

  // Convert numeric fields
  const payload = {
    ...formData,
    price: parseFloat(formData.price),
    availableSlots: parseInt(formData.availableSlots),
  };

  try {
    const res = await fetch('http://localhost:3000/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('Service added successfully!');
      setFormData({
        name: '',
        description: '',
        category: '',
        availableSlots: ''
      });
    } else {
      setMessage(data.error || 'Error adding service');
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
      <h2>Add New Service</h2>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
        Create a new service for customers to book
      </p>
      
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Service Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter service name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe your service"
              value={formData.description}
              onChange={handleChange}
              className="form-input"
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              id="category"
              name="category"
              type="text"
              placeholder="e.g., Health, Education, Business"
              value={formData.category}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="availableSlots">Available Slots</label>
            <input
              id="availableSlots"
              name="availableSlots"
              type="number"
              placeholder="Number of available slots"
              value={formData.availableSlots}
              onChange={handleChange}
              className="form-input"
              min="1"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn"
            disabled={loading}
          >
            {loading ? 'Adding Service...' : 'Add Service'}
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
};

export default AddService;