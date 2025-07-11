import React, { useEffect, useState } from 'react';

function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/bookings')
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error('Failed to fetch bookings:', err));
  }, []);

  return (
    <div>
      <h2>All Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <strong>User:</strong> {booking.User?.name} | <strong>Service:</strong> {booking.Service?.name} | <strong>Date:</strong> {new Date(booking.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingList;
