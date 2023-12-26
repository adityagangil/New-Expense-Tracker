import React from 'react';
import Signup from './components/Signup';
import { initializeApp } from 'firebase/app';
import 'firebase/auth';

// Replace with your Firebase API key
const firebaseConfig = {
  apiKey: "AIzaSyC75P1CU_dMXKX13MPww9e6DxBin4Z-M4I"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const App = () => {
  return (
    <div className="app-container">
      <Signup />
    </div>
  );
};

export default App;
