import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage'; // Replace with your chat page component

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Register Page */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Route for Home Page (Chat Page) */}
        <Route path="/home" element={<HomePage />} />

        {/* Default route redirects to Register */}
        <Route path="*" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
