import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Register from './components/Register';
import Home from './components/Home.jsx';
import Sidebar from './components/Sidebar.jsx';
import Product from './components/product.jsx';
import Customer from './components/customer.jsx';
import Supplier from './components/supplier.jsx';
import Purchase from './components/purchase.jsx';
import Invoice from './components/invoice.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Hide sidebar on register page
  const hideSidebar = location.pathname === '/sign-up';

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (!loggedIn && !window.location.href.toLowerCase().endsWith("sign-up")) {
      window.location.href = '/sign-up';
    }
  }, []);

  return (
    <>
      {!hideSidebar && <Sidebar isOpen={true} toggleSidebar={() => {}} />}
      <div style={{ marginLeft: !hideSidebar ? 250 : 0, transition: 'margin-left 0.3s' }}>
        <Routes>
          <Route path="/sign-up" element={<Register />} />
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/product" element={isLoggedIn ? <Product /> : <Navigate to="/sign-up" />} />
          <Route path="/customer" element={isLoggedIn ? <Customer /> : <Navigate to="/sign-up" />} />
          <Route path="/supplier" element={isLoggedIn ? <Supplier /> : <Navigate to="/sign-up" />} />
          <Route path="/purchase" element={isLoggedIn ? <Purchase /> : <Navigate to="/sign-up" />} />
          <Route path="/invoice" element={isLoggedIn ? <Invoice /> : <Navigate to="/sign-up" />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;


