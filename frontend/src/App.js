// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/sign-up" element={<Register />} />
          {/* Redirect from home to sign-up */}
          <Route path="/" element={<Navigate to="/sign-up" replace />} /> 
        </Routes>
      </div>

    </Router>
  );

}

export default App;
