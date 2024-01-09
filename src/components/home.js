// Home.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Change to useNavigate
import { AuthContext } from './auth-context';

const Home = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();  // Change to useNavigate

  const handleLogout = () => {
    authCtx.logout();
    // Redirect to the login page after logout
    navigate('/');  // Change to navigate
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Logout Button */}
      <button onClick={handleLogout}>Logout</button>

      <h1>Welcome to Expense Tracker</h1>
      {authCtx.isLoggedIn && !authCtx.isProfileComplete && (
        <div>
          <p>Your profile is incomplete. Please complete it.</p>
          <Link to="/complete-profile" style={{ textDecoration: 'none', color: 'blue' }}>
            Complete Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
