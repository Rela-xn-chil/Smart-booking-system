// src/components/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      console.log('🔄 Attempting login to:', API_ENDPOINTS.LOGIN);
      
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('📡 Response status:', response.status);
      const data = await response.json();
      console.log('📦 Response data:', data);

      if (response.ok) {
        // Store both token and userId
        localStorage.setItem('token', data.token);
        // localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userId', data.userId);
        console.log('✅ Login successful');
        
        setMessage('Login successful! Redirecting...');
        onLogin(); // This will update the App state
        
        setTimeout(() => {
          navigate('/my-bookings');
        }, 1000);
      } else {
        console.log('❌ Login failed:', data.message);
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('🚨 Login Error:', error);
      setMessage(`❌ Network error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="login-logo-container">
        <img 
          src="/capaciti-logo.png" 
          alt="Capaciti Logo" 
          className="login-logo"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        
        <div className="logo-fallback" style={{display: 'none'}}>
          <div className="capaciti-logo-svg">
            <svg width="300" height="80" viewBox="0 0 400 100" style={{margin: '0 auto', display: 'block'}}>
              <circle cx="40" cy="50" r="35" fill="#3f4a6a" />
              <path d="M20 30 L35 45 L20 60 L25 65 L45 45 L25 25 Z" fill="white" />
              <path d="M40 30 L55 45 L40 60 L45 65 L65 45 L45 25 Z" fill="#ff6b4a" />
              <text x="100" y="35" fontSize="24" fontWeight="bold" fill="#3f4a6a" fontFamily="Arial, sans-serif">CAPACITI</text>
            </svg>
          </div>
        </div>
      </div>
      
      <h2>Login to BookWise</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        {message && (
          <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;