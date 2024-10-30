// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Home from '../src/components/Home.jsx';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/sign-up" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>

    </Router>
  );

}

export default App;
