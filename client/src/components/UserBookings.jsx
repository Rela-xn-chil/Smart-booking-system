import { useState, useEffect } from 'react';

export default function UserBookings({ userId }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        setLoading(true);
        setError('');
        
        const token = localStorage.getItem('token');
        const response = await fetch(`https://smart-booking-system-backend.onrender.com`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setBookings(data);
      } catch (err) {
        console.error('Error fetching user bookings:', err);
        setError('Failed to load your bookings');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserBookings();
    }
  }, [userId]);

  if (loading) {
    return <div className="loading">Loading your bookings...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (bookings.length === 0) {
    return (
      <div className="card">
        <h2>My Bookings</h2>
        <p>You haven't made any bookings yet.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>My Bookings</h2>
      <div className="bookings-list">
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-item">
            <div className="booking-details">
              <h3>{booking.Service?.name || 'Service Name Not Available'}</h3>
              <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              <p><strong>Description:</strong> {booking.Service?.description || 'N/A'}</p>
              <p><strong>Category:</strong> {booking.Service?.category || 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}