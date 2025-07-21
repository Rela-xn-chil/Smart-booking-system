/* eslint-disable no-undef */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        
        {/* Debug info in development */}
        {process.env.NODE_ENV !== 'production' && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0f0f0', borderRadius: '5px', fontSize: '0.8rem' }}>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;