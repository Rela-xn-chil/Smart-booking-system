import './App.css';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Login from './components/Login';
import Register from './components/Register';
import AddService from './components/AddService';
import ServiceList from './components/ServiceList';
import BookingList from './components/BookingList';
import AddBooking from './components/AddBooking';
import UserBookings from './components/UserBookings';
import Recommendations from './components/Recommendations';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('userId');
    if (token && id) {
      setIsLoggedIn(true);
      setUserId(parseInt(id));
    } else {
      setIsLoggedIn(false);
      setUserId(null);
    }
  }, []);

  const handleLogin = () => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('userId');
    if (token && id) {
      setIsLoggedIn(true);
      setUserId(parseInt(id));
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserId(null);
    window.location.href = '/';
  };

  if (isLoggedIn === null) {
    return <div className="loading">Loading BookWise...</div>;
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-content">
          <Link to="/" className="logo">BookWise</Link>
          <nav className="nav-links">
            {!isLoggedIn ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) : (
              <>
                <Link to="/my-bookings">My Bookings</Link>
                <Link to="/services">View Services</Link>
                <Link to="/add-service">Add Service</Link>
                <Link to="/bookings">All Bookings</Link>
                <Link to="/add-booking">Add Booking</Link>
                <Link to="/recommendations">Recommendations</Link>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </>
            )}
          </nav>
        </div>
      </aside>

      <main className="main-content">
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/add-service" element={<AddService />} />
              <Route path="/services" element={<ServiceList />} />
              <Route path="/bookings" element={<BookingList />} />
              <Route path="/add-booking" element={<AddBooking />} />
              <Route path="/my-bookings" element={userId ? <UserBookings userId={userId} /> : <div className="loading">Loading user data...</div>} />
              <Route path="*" element={<Navigate to="/my-bookings" />} />
              <Route path="/recommendations" element={<Recommendations />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}
export default App;
