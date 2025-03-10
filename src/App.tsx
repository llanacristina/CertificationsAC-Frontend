import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from '../src/screens/LoginScreen';
import RegisterScreen from '../src/screens/RegisterScreen';
import CertificateForm from '../src/screens/CertificateForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />

        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/certificates" element={<CertificateForm />} />
      </Routes>
    </Router>
  );
};

export default App;
