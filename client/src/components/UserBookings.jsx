import { useState, useEffect } from 'react';

function UserBookings({ userId }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        console.log('Fetching bookings for userId:', userId); // ✅ Debug log
        
        const response = await fetch(`http://localhost:5000/api/bookings/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch bookings: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched bookings data:', data); // ✅ Debug log
        setBookings(data);
      } catch (error) {
        console.error('Error fetching user bookings:', error);
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
      <h2>My Bookings</h2>
      
      {bookings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📅</div>
          <h3>No bookings yet</h3>
          <p>You haven't made any bookings yet. Browse our services and book your first appointment!</p>
        </div>
      ) : (
        <div className="list-container">
          {bookings.map((booking) => (
            <div key={booking.id} className="list-item booking-item">
              <strong>Service: {booking.Service?.name || 'Unknown Service'}</strong>
              <p>Category: {booking.Service?.category || 'N/A'}</p>
              <p>Price: ${booking.Service?.price || 'N/A'}</p>
              <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
              <p>Booking ID: #{booking.id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserBookings;