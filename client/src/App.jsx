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
  const [isLoggedIn, setIsLoggedIn] = useState(null);
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
    return (
      <div className="loading">
        Loading BookWise...
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            BookWise
          </Link>

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
                <Link to="/book-service">Book Service</Link>
                <Link to="/bookings">All Bookings</Link>
                <Link to="/add-booking">Add Booking</Link>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="main-content">
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
      </main>
    </div>
  );
}

export default App;