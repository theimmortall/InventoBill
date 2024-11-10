import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Home from './components/Home.jsx';
import Sidebar from './components/Sidebar.jsx';
import Product from './components/product.jsx';
import Customer from './components/customer.jsx';
import Supplier from './components/supplier.jsx';
import Purchase from './components/purchase.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (!loggedIn && !window.location.href.toLowerCase().endsWith("sign-up")) {
      window.location.href = '/sign-up';
    }
  }, []);

  return (
    <Router> 
      <div>
        {isLoggedIn && <Sidebar />}
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/product" element={isLoggedIn ? <Product /> : <Navigate to="/sign-up" />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/customer" element={isLoggedIn ? <Customer /> : <Navigate to="/sign-up" />} />
          <Route path="/supplier" element={isLoggedIn ? <Supplier /> : <Navigate to="/sign-up" />} />
          <Route path="/purchase" element={isLoggedIn ? <Purchase /> : <Navigate to="/sign-up" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
