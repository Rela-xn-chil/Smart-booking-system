import { useEffect, useState } from 'react';

function UserBookings({ userId }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:3000/api/bookings/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          setError('Invalid response from server');
        }
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch bookings');
      })
      .finally(() => setLoading(false));
  }, [userId]);

  if (!userId) {
    return (
      <div className="card">
        <div className="message error">No user logged in.</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="card">
        <div className="loading">Loading your bookings...</div>
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
      <h2>Your Bookings</h2>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
        View and manage your service bookings
      </p>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📅</div>
          <h3>No bookings yet</h3>
          <p>You haven't made any bookings yet. Start by browsing available services!</p>
          <div style={{ marginTop: '1rem' }}>
            <a href="/services" style={{ 
              color: '#667eea', 
              textDecoration: 'none', 
              fontWeight: '500' 
            }}>
              Browse Services →
            </a>
          </div>
        </div>
      ) : (
        <div className="list-container">
          {bookings.map(booking => (
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
                  Booked
                </span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                color: '#666',
                fontSize: '0.95rem'
              }}>
                <span>
                  <strong>📅 Date:</strong> {new Date(booking.date).toLocaleDateString()}
                </span>
                <span>
                  <strong>🕒 Time:</strong> {new Date(booking.date).toLocaleTimeString()}
                </span>
              </div>
              
              {booking.Service?.description && (
                <p style={{ 
                  color: '#666', 
                  marginTop: '1rem',
                  padding: '0.75rem',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  fontSize: '0.9rem'
                }}>
                  {booking.Service.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserBookings;