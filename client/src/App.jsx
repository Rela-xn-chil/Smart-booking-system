import './App.css';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Login from './components/Login';
import Register from './components/Register';
import AddService from './components/AddService';
import ServiceList from './components/ServiceList';
import BookService from './components/BookService';
import BookingList from './components/BookingList';
import AddBooking from './components/AddBooking';
import UserBookings from './components/UserBookings';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null until we check
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('userId');
    if (token) {
      setIsLoggedIn(true);
      setUserId(id);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserId(null);
    window.location.href = '/';
  };

  if (isLoggedIn === null) {
    // Delay rendering until we know login state
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome to BookWise</h1>

      <nav>
        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link> | 
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/my-bookings">My Bookings</Link> |
            <Link to="/add-service">Add Service</Link> | 
            <Link to="/services">View Services</Link> |
            <Link to="/book-service">Book Service</Link> |
            <Link to="/bookings">All Bookings</Link> |
            <Link to="/add-booking">Add Booking</Link> |
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>

      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/add-service" element={<AddService />} />
            <Route path="/services" element={<ServiceList />} />
            <Route path="/book-service" element={<BookService />} />
            <Route path="/bookings" element={<BookingList />} />
            <Route path="/add-booking" element={<AddBooking />} />
            <Route
  path="/my-bookings"
  element={userId ? <UserBookings userId={userId} /> : <Navigate to="/login" />}
/>
            <Route path="*" element={<Navigate to="/my-bookings" />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
