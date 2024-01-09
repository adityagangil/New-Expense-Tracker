// CompleteProfile.js
<<<<<<< HEAD
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './auth-context';
=======
import React, { useContext, useState } from 'react';
import { AuthContext } from './auth-context';
// import { updateFirebaseUserProfile } from './firebase-utils';
>>>>>>> 2de0aefc35d4193d01bf742a8f42f397e6249149
import './CompleteProfile.css';

const CompleteProfile = () => {
  const authCtx = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
<<<<<<< HEAD
    displayName: '',
    photoURL: '',
  });

  useEffect(() => {
    // Fetch user profile data from Firebase API upon component mount
    const apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC75P1CU_dMXKX13MPww9e6DxBin4Z-M4I`;

    const requestBody = {
      idToken: authCtx.token,
    };

    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle the response from the Firebase API
        if (data.users && data.users.length > 0) {
          const user = data.users[0];
          setProfileData({
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        // Handle error, show message, etc.
      });
  }, [authCtx.token]);

=======
    // Initialize with existing user data if available
    displayName: authCtx.displayName || '',
    photoURL: authCtx.photoURL || '',
  });

>>>>>>> 2de0aefc35d4193d01bf742a8f42f397e6249149
  const handleUpdateProfile = () => {
    // Call the Firebase API to update user details
    const apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC75P1CU_dMXKX13MPww9e6DxBin4Z-M4I`;

    const requestBody = {
      idToken: authCtx.token,
      displayName: profileData.displayName,
      photoUrl: profileData.photoURL,
      returnSecureToken: true,
    };

    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle the response from the Firebase API
        console.log('User details updated successfully:', data);
        // Optionally, you can update the local user context with the new data
        authCtx.updateProfile({ displayName: data.displayName, photoURL: data.photoUrl });
        // Redirect or perform additional actions after updating profile
      })
      .catch((error) => {
        console.error('Error updating user details:', error);
        // Handle error, show message, etc.
      });
  };

  return (
    <div className="text-center">
      <h1>Complete Your Profile</h1>
      <form>
        <div>
          <label htmlFor="displayName">Display Name:</label>
          <input
            type="text"
            id="displayName"
            value={profileData.displayName}
            onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="photoURL">Photo URL:</label>
          <input
            type="text"
            id="photoURL"
            value={profileData.photoURL}
            onChange={(e) => setProfileData({ ...profileData, photoURL: e.target.value })}
          />
        </div>
        <button type="button" onClick={handleUpdateProfile}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default CompleteProfile;
