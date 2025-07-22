// src/components/ServiceList.jsx
import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../config/api';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(API_ENDPOINTS.SERVICES)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching services:', err);
        setError('Failed to load services');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="card">
        <div className="loading">Loading services...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="message error">{error}</div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Available Services</h2>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
        Browse and discover services you can book
      </p>

      {services.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏢</div>
          <h3>No services available</h3>
          <p>There are currently no services to display.</p>
        </div>
      ) : (
        <div className="list-container">
          {services.map((service) => (
            <div key={service.id} className="list-item service-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: '#333', fontSize: '1.3rem' }}>{service.name}</h3>
                <span style={{ 
                  background: service.price ? '#28a745' : '#6c757d', 
                  color: 'white', 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                </span>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ 
                  background: '#667eea', 
                  color: 'white', 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '15px',
                  fontSize: '0.8rem',
                  fontWeight: '500'
                }}>
                  {service.category}
                </span>
              </div>

              <p style={{ color: '#666', marginBottom: '1rem', lineHeight: '1.6' }}>
                {service.description}
              </p>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingTop: '1rem',
                borderTop: '1px solid #eee'
              }}>
                <span style={{ color: '#888', fontSize: '0.9rem' }}>
                  <strong>Available Slots:</strong> {service.availableSlots}
                </span>
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {service.availableSlots > 0 ? (
                    <span style={{ 
                      color: '#28a745', 
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>
                      ✅ Available
                    </span>
                  ) : (
                    <span style={{ 
                      color: '#dc3545', 
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>
                      ❌ Fully Booked
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceList;
