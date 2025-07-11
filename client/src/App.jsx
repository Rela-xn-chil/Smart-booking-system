import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import AddService from './components/AddService';
import ServiceList from './components/ServiceList';
import BookService from './components/BookService';
import BookingList from './components/BookingList';
import AddBooking from './components/AddBooking';

function App() {
  return (
    <div>
      <h1>Welcome to BookWise</h1>
      <nav>
        <Link to="/login">Login</Link> | 
        <Link to="/register">Register</Link> | 
        <Link to="/add-service">Add Service</Link> | 
        <Link to="/services">View Services</Link> |
        <Link to="/book-service">Book Service</Link> |
        <Link to="/bookings">All Bookings</Link> |
        <Link to="/add-booking">Add Booking</Link> |

      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-service" element={<AddService />} />
        <Route path="/services" element={<ServiceList />} />
        <Route path="/book-service" element={<BookService />} />
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/add-booking" element={<AddBooking />} />
      </Routes>
    </div>
  );
}

<input type="text" style={{ color: 'black' }} />

export default App;

