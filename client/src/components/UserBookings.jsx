import { useState, useEffect } from 'react';

export default function UserBookings({ userId }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_BASE_URL = 'https://smart-booking-system-backend.onrender.com';

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        setLoading(true);
        setError('');
        
        const token = localStorage.getItem('token');
        
        // If no userId is provided and we have a token, fetch current user's bookings
        const endpoint = userId 
          ? `${API_BASE_URL}/api/bookings/user/${userId}`
          : `${API_BASE_URL}/api/bookings/my`;

        const headers = {
          'Content-Type': 'application/json'
        };

        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(endpoint, {
          method: 'GET',
          headers
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Authentication required. Please log in.');
          } else if (response.status === 404) {
            throw new Error('No bookings found.');
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        const data = await response.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching user bookings:', err);
        setError(err.message || 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if we have a userId or if we're fetching for the current user
    fetchUserBookings();
  }, [userId]);

  const handleCancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json'
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}`, {
        method: 'DELETE',
        headers
      });

      if (response.ok) {
        // Remove the cancelled booking from the state
        setBookings(bookings.filter(booking => booking.id !== bookingId));
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to cancel booking');
      }
    } catch (err) {
      console.error('Error cancelling booking:', err);
      setError(err.message || 'Failed to cancel booking');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const getBookingStatus = (bookingDate) => {
    const now = new Date();
    const booking = new Date(bookingDate);
    
    if (booking < now) {
      return 'past';
    } else {
      return 'upcoming';
    }
  };

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
        <div className="error">{error}</div>
      </div>
    );
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
        {bookings.map((booking) => {
          const { date, time } = formatDate(booking.date);
          const status = getBookingStatus(booking.date);
          
          return (
            <div key={booking.id} className={`booking-item ${status}`}>
              <div className="booking-details">
                <h3>{booking.Service?.name || 'Service Name Not Available'}</h3>
                <div className="booking-meta">
                  <p><strong>Date:</strong> {date}</p>
                  <p><strong>Time:</strong> {time}</p>
                  <p><strong>Status:</strong> 
                    <span className={`status ${status}`}>
                      {status === 'past' ? 'Completed' : 'Upcoming'}
                    </span>
                  </p>
                </div>
                {booking.Service?.description && (
                  <p><strong>Description:</strong> {booking.Service.description}</p>
                )}
                {booking.Service?.category && (
                  <p><strong>Category:</strong> {booking.Service.category}</p>
                )}
                {booking.Service?.duration && (
                  <p><strong>Duration:</strong> {booking.Service.duration} minutes</p>
                )}
              </div>
              
              {status === 'upcoming' && (
                <div className="booking-actions">
                  <button 
                    className="btn btn-danger"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to cancel this booking?')) {
                        handleCancelBooking(booking.id);
                      }
                    }}
                  >
                    Cancel Booking
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}