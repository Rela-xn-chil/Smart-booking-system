import './App.css'
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Welcome to BookWise</h1>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </nav>
    </div>
  );
}

export default App;

