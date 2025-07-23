import React, { useEffect, useState } from 'react';

function Recommendations() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch('https://smart-booking-system-backend.onrender.com/api/recommendations');
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError('Failed to load recommendations');
        console.error('❌ Recommendation fetch error:', err);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="card">
      <h2>📊 Booking Slot Recommendations</h2>
      {error && <p className="error">{error}</p>}

      {data ? (
        <>
          <h3>✅ Quieter Slots</h3>
          <ul>
            {data.bestSlots.map((slot) => (
              <li key={slot.hour}>
                {slot.label} – {slot.count} bookings
              </li>
            ))}
          </ul>

          <h3>🚨 Busiest Slots</h3>
          <ul>
            {data.busiestSlots.map((slot) => (
              <li key={slot.hour}>
                {slot.label} – {slot.count} bookings
              </li>
            ))}
          </ul>
        </>
      ) : (
        !error && <p>Loading recommendations...</p>
      )}
    </div>
  );
}

export default Recommendations;
