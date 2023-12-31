import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AuthForm from './components/AuthForm';
import Home from './components/home';
import CompleteProfile from './components/CompleteProfile';
import { AuthContext, AuthContextProvider } from './components/auth-context';

const ProtectedRoute = ({ element }) => {
  const authCtx = useContext(AuthContext);

  return authCtx.isLoggedIn ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Container className="mt-4 text-center">
          <Routes>
            <Route path="/" element={<AuthForm />} />
            <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
            <Route path="/complete-profile" element={<ProtectedRoute element={<CompleteProfile />} />} />
          </Routes>
        </Container>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
