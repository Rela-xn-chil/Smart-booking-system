// src/components/BookingList.jsx
import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../config/api';

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    fetch(API_ENDPOINTS.BOOKINGS, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch bookings:', err);
        setError('Failed to load bookings');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="card">
        <div className="loading">Loading all bookings...</div>
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
      <h2>All Bookings</h2>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
        View all bookings made in the system
      </p>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <h3>No bookings found</h3>
          <p>There are currently no bookings in the system.</p>
        </div>
      ) : (
        <div className="list-container">
          {bookings.map((booking) => (
            <div key={booking.id} className="list-item booking-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: '#333', fontSize: '1.3rem' }}>
                  {booking.Service?.name || 'Unknown Service'}
                </h3>
                <span style={{ 
                  background: '#17a2b8', 
                  color: 'white', 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  Active
                </span>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  marginBottom: '0.5rem',
                  flexWrap: 'wrap'
                }}>
                  <span style={{ 
                    background: '#667eea', 
                    color: 'white', 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}>
                    👤 {booking.User?.name || 'Unknown User'}
                  </span>
                  
                  {booking.Service?.category && (
                    <span style={{ 
                      background: '#28a745', 
                      color: 'white', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      fontWeight: '500'
                    }}>
                      {booking.Service.category}
                    </span>
                  )}

                  {booking.Service?.price && (
                    <span style={{ 
                      background: '#ffc107', 
                      color: '#212529', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      fontWeight: '500'
                    }}>
                      ${booking.Service.price}
                    </span>
                  )}
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                color: '#666',
                fontSize: '0.95rem',
                paddingTop: '1rem',
                borderTop: '1px solid #eee',
                flexWrap: 'wrap'
              }}>
                <span>
                  <strong>📅 Date:</strong> {new Date(booking.date).toLocaleDateString()}
                </span>
                <span>
                  <strong>🕒 Time:</strong> {new Date(booking.date).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingList;