import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './auth-context';

const Home = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className="text-center">
      <h1>Welcome to Expense Tracker</h1>
      {authCtx.isLoggedIn && !authCtx.isProfileComplete && (
        <div>
          <p>Your profile is incomplete. Please complete it.</p>
          <Link to="/complete-profile">Complete Profile</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
