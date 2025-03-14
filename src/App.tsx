import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginScreen from '../src/screens/LoginScreen';
import RegisterScreen from '../src/screens/RegisterScreen';
import CertificateForm from '../src/screens/CertificateForm';
import AdminScreen from './screens/AdminScreen';

const App: React.FC = () => {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  let role;

    if (token) {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o token
    role = payload.role; // Pega o papel (user ou admin)
  }

  const isAdmin = token && role === 'admin';

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />

        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/certificates" element={<CertificateForm />} />

        <Route path="/admin" element={isAdmin ? <AdminScreen /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
