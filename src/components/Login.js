import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Replace with your Firebase API key
const apiKey = "https://expense-tracker-e3c60-default-rtdb.firebaseio.com/";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      // Initialize Firebase with only the API key
      const auth = getAuth(apiKey);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setError(null);
      onLogin(user); // Pass the user object to the parent component
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <Container className="mt-4 text-center">
      <h1 className="mb-4">Login</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group><br></br>
        <Button variant="primary" type="button" onClick={handleLogin}>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
