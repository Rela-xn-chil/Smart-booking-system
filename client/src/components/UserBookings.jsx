import { useEffect, useState } from 'react';

function UserBookings({ userId }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/bookings/user/${userId}`)
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.error(err));
  }, [userId]);

  return (
    <div>
      <h2>Your Bookings</h2>
      <ul>
        {bookings.map(b => (
          <li key={b.id}>
            ✅ {b.Service?.name || 'Unknown'} on {new Date(b.date).toLocaleString()}
          </li>
        ))}
      </ul>
      {bookings.length === 0 && <p>You have no bookings yet.</p>}
    </div>
  );
}

export default UserBookings;
