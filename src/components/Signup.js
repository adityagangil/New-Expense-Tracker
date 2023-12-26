import React, { useState } from 'react';
import './Signup.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const signUp = () => {
        setError(null);

        if (email && password && confirmPassword) {
            if (password === confirmPassword) {
                const auth = getAuth();
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // User signed up successfully
                        console.log('User has successfully signed up');
                    })
                    .catch((error) => {
                        // Handle errors
                        setError(error.message);
                    });
            } else {
                setError('Passwords do not match');
            }
        } else {
            setError('All fields are mandatory');
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            {error && <p className="error-message">{error}</p>}
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <label>Confirm Password:</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

            <button onClick={signUp}>Sign Up</button>

            {/* Additional div for existing users */}
            <div className="existing-user-message">
                <p>Already have an account?</p>
                <a href="/login">Login</a>
            </div>
        </div>
    );
};

export default Signup;
