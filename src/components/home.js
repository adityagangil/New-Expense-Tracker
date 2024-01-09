import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './auth-context';

const Home = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to Expense Tracker</h1>
      {authCtx.isLoggedIn && !authCtx.isProfileComplete && (
        <div>
          <p>Your profile is incomplete. Please complete it.</p>
<<<<<<< HEAD
          <Link to="/complete-profile" style={{ textDecoration: 'none', color: 'blue' }}>
            Complete Profile
          </Link>
=======
          <Link to="/complete-profile">Complete Profile</Link>
>>>>>>> 2de0aefc35d4193d01bf742a8f42f397e6249149
        </div>
      )}
    </div>
  );
};

export default Home;
