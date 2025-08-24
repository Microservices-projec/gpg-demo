import { useState, useEffect } from 'react';
import { apiGet, apiPost } from './api';

export default function Dashboard({ user, onLogout }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const response = await apiGet('/data');
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to load user data:', error);
      setMessage('Failed to load your data');
    } finally {
      setLoading(false);
    }
  };

  const addAchievement = async () => {
    try {
      const newAchievement = {
        id: Date.now(),
        name: `Achievement #${Math.floor(Math.random() * 100)}`,
        points: 10,
        timestamp: new Date().toISOString()
      };

      const response = await apiPost('/data', {
        blogs: [newAchievement],
        score: 10,
        xp: 25
      });

      setUserData(response.data);
      setMessage('Achievement unlocked! +10 points');
    } catch (error) {
      console.error('Failed to add achievement:', error);
      setMessage('Failed to update data');
    }
  };

  const levelUp = async () => {
    try {
      const response = await apiPost('/data', {
        level: (userData?.level || 1) + 1,
        xp: 0 // Reset XP on level up
      });

      setUserData(response.data);
      setMessage('Level up! 🎉');
    } catch (error) {
      console.error('Failed to level up:', error);
      setMessage('Failed to level up');
    }
  };

  const resetProgress = async () => {
    if (!window.confirm('Are you sure you want to reset your progress?')) return;
    
    try {
      const response = await apiPost('/data', {
        blogs: [],
        score: 0,
        xp: 0,
        level: 1
      });

      setUserData(response.data);
      setMessage('Progress reset successfully');
    } catch (error) {
      console.error('Failed to reset progress:', error);
      setMessage('Failed to reset progress');
    }
  };

  if (loading) return <div className="card">Loading your game data...</div>;

  return (
    <div className="dashboard">
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Welcome, {user.name}! 🎮</h2>
        <button onClick={onLogout} style={{ background: '#ff4757', color: 'white' }}>
          Logout
        </button>
      </div>

      {message && (
        <div className="card" style={{ background: '#d4edda', borderColor: '#c3e6cb' }}>
          {message}
        </div>
      )}

      {/* Stats Card */}
      <div className="card">
        <h3>Player Stats</h3>
        <div className="row">
          <div style={{ flex: 1 }}>
            <h4>Level {userData?.level || 1}</h4>
            <progress 
              value={userData?.xp || 0} 
              max="100" 
              style={{ width: '100%' }}
            >
              {userData?.xp || 0}%
            </progress>
            <small>XP: {userData?.xp || 0}/100</small>
          </div>
          <div style={{ flex: 1 }}>
            <h4>Score: {userData?.score || 0}</h4>
            <p>Achievements: {userData?.blogs?.length || 0}</p>
          </div>
        </div>
      </div>

      {/* Actions Card */}
      <div className="card">
        <h3>Game Actions</h3>
        <div className="row">
          <button onClick={addAchievement} style={{ background: '#4CAF50', color: 'white' }}>
            🏆 Unlock Achievement
          </button>
          <button onClick={levelUp} style={{ background: '#2196F3', color: 'white' }}>
            ⬆ Level Up
          </button>
          <button onClick={resetProgress} style={{ background: '#ff6b6b', color: 'white' }}>
            🔄 Reset Progress
          </button>
        </div>
      </div>

      {/* Achievements Card */}
      <div className="card">
        <h3>Achievements ({userData?.blogs?.length || 0})</h3>
        {userData?.blogs?.length > 0 ? (
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {userData.blogs.map((achievement, index) => (
              <div key={achievement.id || index} className="row" style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                <span style={{ flex: 1 }}>{achievement.name}</span>
                <small style={{ color: '#666' }}>
                  +{achievement.points} points • {new Date(achievement.timestamp).toLocaleDateString()}
                </small>
              </div>
            ))}
          </div>
        ) : (
          <p>No achievements yet. Play more to unlock them!</p>
        )}
      </div>

      {/* Debug Info */}
      <div className="card">
        <h3>Debug Information</h3>
        <details>
          <summary>User Data (Raw JSON)</summary>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </details>
      </div>
    </div>
  );
}