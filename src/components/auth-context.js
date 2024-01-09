// auth-context.js
import React, { useState, useEffect, useCallback } from 'react';

export const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  updateProfile: (newProfile) => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  const [logoutTimer, setLogoutTimer] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setDisplayName('');
    setPhotoURL('');
    localStorage.removeItem('token');
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, [logoutTimer]);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
    setLogoutTimer(setTimeout(logoutHandler, 300000)); // 5 minutes in milliseconds
  };

  const updateProfile = useCallback((newProfile) => {
    setDisplayName(newProfile.displayName);
    setPhotoURL(newProfile.photoURL);
  }, []);

  useEffect(() => {
    if (userIsLoggedIn) {
      const remainingTime = localStorage.getItem('expirationTime');
      const remainingTimeInMilliseconds = remainingTime
        ? Math.max(0, new Date(remainingTime) - new Date())
        : null;

      if (remainingTimeInMilliseconds) {
        setLogoutTimer(setTimeout(logoutHandler, remainingTimeInMilliseconds));
      }
    }
  }, [userIsLoggedIn, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    updateProfile: updateProfile,
    displayName: displayName,
    photoURL: photoURL,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
