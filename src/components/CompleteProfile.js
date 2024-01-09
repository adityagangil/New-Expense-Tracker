// Inside your CompleteProfile.js component
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './auth-context';
import { useNavigate } from 'react-router-dom'; 
import './CompleteProfile.css';

const CompleteProfile = () => {
  const authCtx = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    displayName: '',
    photoURL: '',
  });
  const navigate = useNavigate(); 
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    // Fetch user profile data from Firebase API upon component mount
    const apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC75P1CU_dMXKX13MPww9e6DxBin4Z-M4I
    `;

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
          setIsEmailVerified(user.emailVerified);
        }
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        // Handle error, show message, etc.
      });
  }, [authCtx.token]);

  const handleUpdateProfile = () => {
    // Call the Firebase API to update user details
    const apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC75P1CU_dMXKX13MPww9e6DxBin4Z-M4I
    `;

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

        // After updating profile, check if email is verified
        setIsEmailVerified(data.emailVerified);

        // If email is not verified, initiate email verification
        if (!data.emailVerified) {
          initiateEmailVerification();
        }
        navigate('/'); 
      })
      .catch((error) => {
        console.error('Error updating user details:', error);
        // Handle error, show message, etc.
      });
  };

  const initiateEmailVerification = () => {
    const apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC75P1CU_dMXKX13MPww9e6DxBin4Z-M4I
    `;

    const requestBody = {
      requestType: 'VERIFY_EMAIL',
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
        console.log('Verification email sent successfully:', data);
        // Handle success, show message to the user
      })
      .catch((error) => {
        console.error('Error sending verification email:', error);
        // Handle error, show message, etc.
      });
  };

  return (
    <div className="text-center">
      {/* Logout Button */}
      <button onClick={authCtx.logout}>Logout</button>

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
        </button><br></br><br></br>

        {/* Show the "Verify Email" button only if email is not verified */}
        {!isEmailVerified && (
          <button type="button" onClick={initiateEmailVerification}>
            Verify Email
          </button>
        )}
      </form>
    </div>
  );
};

export default CompleteProfile;
