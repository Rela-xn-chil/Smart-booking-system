/* eslint-disable no-undef */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import the logo (put the logo in src/assets/ folder for this method)
// import capacitiLogo from '../assets/capaciti-logo.png';

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
      console.log('🔄 Attempting login to: http://localhost:3000/api/auth/login');
      
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

      const data = await response.json();
      console.log('📦 Response data:', data);

      if (response.ok) {
        // Store both token and userId
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        console.log('✅ Login successful, stored:', { 
          token: data.token.substring(0, 20) + '...', 
          userId: data.userId 
        });
        
        setMessage('Login successful! Redirecting...');
        onLogin(); // This will update the App state
        
        // Small delay to show success message
        setTimeout(() => {
          navigate('/my-bookings');
        }, 1000);
      } else {
        console.log('❌ Login failed:', data.message);
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('🚨 Network/Fetch Error Details:');
      console.error('Error type:', error.name);
      console.error('Error message:', error.message);
      console.error('Full error:', error);
      
      // More specific error messages
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setMessage('❌ Cannot connect to server. Make sure the backend is running on http://localhost:3000');
      } else if (error.name === 'SyntaxError') {
        setMessage('❌ Server returned invalid response. Check server logs.');
      } else {
        setMessage(`❌ Network error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      {/* Capaciti Logo - Multiple fallback options */}
      <div className="login-logo-container">
        {/* Try public folder method first */}
        <img 
          src="/capaciti-logo.png" 
          alt="Capaciti Logo" 
          className="login-logo"
          onError={(e) => {
            console.log('❌ Logo failed to load from public folder, trying alternatives...');
            // Try different extensions
            e.target.src = "/capaciti-logo.jpg";
            e.target.onerror = () => {
              e.target.src = "/capaciti-logo.jpeg";
              e.target.onerror = () => {
                e.target.src = "/capaciti-logo.svg";
                e.target.onerror = () => {
                  // Final fallback - hide image and show text
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                };
              };
            };
          }}
        />
        
        {/* Fallback logo using inline SVG (recreating the Capaciti logo) */}
        <div className="logo-fallback" style={{display: 'none'}}>
          <div className="capaciti-logo-svg">
            <svg width="300" height="80" viewBox="0 0 400 100" style={{margin: '0 auto', display: 'block'}}>
              {/* Circle with pattern */}
              <circle cx="40" cy="50" r="35" fill="#3f4a6a" />
              {/* Stylized arrow/chevron patterns */}
              <path d="M20 30 L35 45 L20 60 L25 65 L45 45 L25 25 Z" fill="white" />
              <path d="M40 30 L55 45 L40 60 L45 65 L65 45 L45 25 Z" fill="#ff6b4a" />
              
              {/* CAPACITI text */}
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
