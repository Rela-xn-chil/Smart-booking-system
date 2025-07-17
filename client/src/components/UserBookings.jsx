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

  if (!userId) return <p>⚠️ No user logged in.</p>;
  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Your Bookings</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map(b => (
            <li key={b.id}>
              ✅ {b.Service?.name || 'Unknown'} on {new Date(b.date).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no bookings yet.</p>
      )}
    </div>
  );
}

export default UserBookings;
