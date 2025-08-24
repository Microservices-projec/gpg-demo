import { useState, useEffect } from 'react';
import { apiGet, apiPost } from './api';
import GoogleLoginButton from './components/GoogleLoginButton';
import Dashboard from './components/Dashboard';
import './styles.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Use the correct endpoint: /user/profile instead of /me
      const response = await apiGet('/user/profile');
      if (response.user) {
        // Load user profile data - use correct endpoint: /user/data instead of /data
        const userResponse = await apiGet('/user/data');
        setUser({ ...response.user, ...userResponse.data });
      }
    } catch (error) {
      console.log('Not authenticated');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (userData) => {
    try {
      // After login, fetch the complete user data
      const userResponse = await apiGet('/user/data');
      setUser({ ...userData, ...userResponse.data });
    } catch (error) {
      console.error('Failed to load user data after login:', error);
      setUser(userData); // Still set basic user data if detailed fetch fails
    }
  };

  const handleLogout = async () => {
    try {
      await apiPost('/auth/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="card">
        <h2>Loading...</h2>
        <p>Checking authentication status...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="row" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>🎮 Google Play Games Demo</h1>
        {user && (
          <div className="row">
            <img 
              src={user.picture} 
              alt={user.name}
              style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
            />
            <span>Welcome, {user.name}</span>
          </div>
        )}
      </header>

      {!user ? (
        <div className="card">
          <h2>Welcome to Game Demo</h2>
          <p>Sign in with Google to start playing and track your progress!</p>
          <div className="row">
            <GoogleLoginButton onLogin={handleLogin} />
          </div>
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <h4>🎯 Features:</h4>
            <ul>
              <li>Google Sign-In authentication</li>
              <li>Progress tracking (Level, XP, Score)</li>
              <li>Achievement system</li>
              <li>Persistent game data</li>
              <li>Resume gameplay across sessions</li>
            </ul>
          </div>
        </div>
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}

      <footer style={{ marginTop: '3rem', textAlign: 'center', color: '#666' }}>
        <p>Built with React, Node.js, Express, MySQL, and Google Identity Services</p>
        <p>Demo showcasing Google Play Games-like functionality</p>
      </footer>
    </div>
  );
}

export default App;