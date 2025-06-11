import React, { useEffect, useState, useCallback } from 'react';
import { ButtonsContainer, UserProfile, UserImage, Dropdown, LogoutButton } from '../styles/styles';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import bg3 from "../assets/user.png";
import { FaBoxOpen } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { MdOutlineInventory } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { LuTriangleAlert } from "react-icons/lu";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { getProducts, getPurchases, getStock, getSuppliers, getAlerts } from '../api/api';

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin: 2rem 2vw 0 2vw;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(44, 62, 80, 0.08);
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  min-width: 0;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 6px 32px rgba(44, 62, 80, 0.18);
    transform: translateY(-4px) scale(1.02);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #4cb5a3;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const KPIs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const KPI = styled.div`
  flex: 1 1 120px;
  min-width: 100px;
  color: #222;
  font-weight: 500;
  span {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: #4cb5a3;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 140px;
`;

const Loading = styled.div`
  text-align: center;
  margin: 3rem 0;
  font-size: 1.2rem;
  color: #4cb5a3;
`;

const COLORS = ['#4cb5a3', '#f7b731', '#eb3b5a', '#3867d6', '#a55eea'];

// Add new styled components for header and animated KPIs
const Header = styled.div`
  margin: 2rem 2vw;
  padding: 1rem;
  background: linear-gradient(135deg, #4cb5a3, #3867d6);
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  h1 { font-size: 2rem; margin: 0; }
  p { margin: 0.5rem 0 0; opacity: 0.9; }
`;

const AnimatedKPI = styled(KPI)`
  span {
    transition: all 0.3s ease;
    &:hover { transform: scale(1.1); }
  }
`;

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState('User');
  const userImage = bg3;

  // Dashboard state
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  // Fetch all data in parallel
  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [prod, purch, supp, alrt] = await Promise.all([
      getProducts(),
      getPurchases(),
      getSuppliers(),
      getAlerts()
    ]);
    setProducts(prod || []);
    setPurchases(purch || []);
    setSuppliers(supp || []);
    setAlerts(alrt || []);
    setLoading(false);
    setLastUpdated(Date.now());
  }, []);

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 5 * 60 * 1000); // Refresh every 5 min
    return () => clearInterval(interval);
  }, [fetchAll]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      const name = localStorage.getItem("userName");
      if (name) {
        setUserName(name);
      }
    }
  }, [setIsLoggedIn]);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    navigate('/sign-up');
  };

  // --- KPI Calculations ---
  // Product Analytics
  const totalProducts = products.length;
  const avgSellPrice = products.length ? (products.reduce((sum, p) => sum + (p.sellPrice || 0), 0) / products.length).toFixed(2) : 0;
  const lowStockCount = products.filter(p => p.stock <= (p.lowStockThreshold || 5)).length;

  // Purchase Analytics
  const totalInvoices = purchases.length;
  const spendThisMonth = purchases.filter(p => {
    const d = new Date(p.date);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).reduce((sum, p) => sum + (p.total || 0), 0);
  const avgInvoiceValue = purchases.length ? (purchases.reduce((sum, p) => sum + (p.total || 0), 0) / purchases.length).toFixed(2) : 0;

  // Stock Analytics
  const totalStockQty = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const outOfStockCount = products.filter(p => p.stock === 0).length;
  const fastestMoving = [...products]
    .sort((a, b) => (b.monthlySales || 0) - (a.monthlySales || 0))
    .slice(0, 3)
    .map(p => p.name);

  // Supplier Analytics
  const totalSuppliers = suppliers.length;
  const avgLeadTime = suppliers.length ? (suppliers.reduce((sum, s) => sum + (s.leadTime || 0), 0) / suppliers.length).toFixed(1) : 0;
  const pendingSuppliers = suppliers.filter(s => s.pendingOrders && s.pendingOrders > 0).length;

  // Alert Analytics
  const activeAlerts = alerts.filter(a => a.active).length;
  const alertByType = alerts.reduce((acc, a) => {
    acc[a.type] = (acc[a.type] || 0) + 1;
    return acc;
  }, {});

  // --- Chart Data ---
  // Example: Monthly trends for products and purchases
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    return d.toLocaleString('default', { month: 'short' });
  });

  const productTrend = months.map((m, i) => ({
    month: m,
    products: products.filter(p => {
      const d = new Date(p.createdAt);
      const now = new Date();
      return d.getMonth() === (now.getMonth() - (5 - i)) && d.getFullYear() === now.getFullYear();
    }).length
  }));

  const purchaseTrend = months.map((m, i) => ({
    month: m,
    purchases: purchases.filter(p => {
      const d = new Date(p.date);
      const now = new Date();
      return d.getMonth() === (now.getMonth() - (5 - i)) && d.getFullYear() === now.getFullYear();
    }).length
  }));

  const supplierTrend = months.map((m, i) => ({
    month: m,
    suppliers: suppliers.filter(s => {
      const d = new Date(s.createdAt);
      const now = new Date();
      return d.getMonth() === (now.getMonth() - (5 - i)) && d.getFullYear() === now.getFullYear();
    }).length
  }));

  const alertPieData = Object.entries(alertByType).map(([type, value], idx) => ({
    name: type,
    value,
    color: COLORS[idx % COLORS.length]
  }));

  // --- Modal logic (simplified, you can expand as needed) ---
  const [modal, setModal] = useState(null);
  const openModal = (type) => setModal(type);
  const closeModal = () => setModal(null);

  // --- Loading ---
  if (loading) {
    return (
      <>
        <ButtonsContainer>
          {isLoggedIn && (
            <UserProfile onClick={() => setDropdownOpen(!dropdownOpen)}>
              <UserImage src={userImage} alt="User" />
              <span>{userName}</span>
              <Dropdown open={dropdownOpen}>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
              </Dropdown>
            </UserProfile>
          )}
        </ButtonsContainer>
        <Loading>Loading dashboard...</Loading>
      </>
    );
  }

  return (
    <>
      <Header>
        <h1>Welcome, {userName}!</h1>
        <p>Your dashboard overview</p>
      </Header>
      <CardGrid>
        {/* Product Analytics */}
        <Card>
          <CardHeader>
            <FaBoxOpen size={22} />
            Product Analytics
          </CardHeader>
          <KPIs>
            <AnimatedKPI><span>{totalProducts}</span>Products</AnimatedKPI>
            <AnimatedKPI><span>₹{avgSellPrice}</span>Avg Sell Price</AnimatedKPI>
            <AnimatedKPI><span>{lowStockCount}</span>Low Stock</AnimatedKPI>
          </KPIs>
          <ChartContainer onClick={() => openModal('products')}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productTrend}>
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="products" stroke="#4cb5a3" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>
        {/* Purchase Analytics */}
        <Card>
          <CardHeader>
            <TiShoppingCart size={22} />
            Purchase Analytics
          </CardHeader>
          <KPIs>
            <AnimatedKPI><span>{totalInvoices}</span>Invoices</AnimatedKPI>
            <AnimatedKPI><span>₹{spendThisMonth}</span>Spend This Month</AnimatedKPI>
            <AnimatedKPI><span>₹{avgInvoiceValue}</span>Avg Invoice</AnimatedKPI>
          </KPIs>
          <ChartContainer onClick={() => openModal('purchases')}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={purchaseTrend}>
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="purchases" stroke="#4cb5a3" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>
        {/* Supplier Analytics */}
        <Card>
          <CardHeader>
            <GoPeople size={22} />
            Supplier Analytics
          </CardHeader>
          <KPIs>
            <AnimatedKPI><span>{totalSuppliers}</span>Suppliers</AnimatedKPI>
            <AnimatedKPI><span>{avgLeadTime}d</span>Avg Lead Time</AnimatedKPI>
            <AnimatedKPI><span>{pendingSuppliers}</span>Pending Orders</AnimatedKPI>
          </KPIs>
          <ChartContainer onClick={() => openModal('suppliers')}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={supplierTrend}>
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="suppliers" stroke="#4cb5a3" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>
        {/* Alert Analytics */}
        <Card>
          <CardHeader>
            <LuTriangleAlert size={22} />
            Alert Analytics
          </CardHeader>
          <KPIs>
            <AnimatedKPI><span>{activeAlerts}</span>Active Alerts</AnimatedKPI>
            {alertPieData.map((a, i) => (
              <AnimatedKPI key={a.name}><span>{a.value}</span>{a.name}</AnimatedKPI>
            ))}
          </KPIs>
          <ChartContainer onClick={() => openModal('alerts')}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={alertPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={45}
                  innerRadius={25}
                  label
                >
                  {alertPieData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>
        {/* Add a new card for deeper analytics (Top 5 Products) after the Alert Analytics card */}
        <Card>
          <CardHeader>
            <FaBoxOpen size={22} />
            Top 5 Products
          </CardHeader>
          <div style={{ padding: '1rem 0' }}>
            {products.slice(0, 5).map((p, i) => (
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', padding: '0.5rem', background: i % 2 === 0 ? '#f9f9f9' : 'white', borderRadius: '4px' }}>
                <span>{p.name}</span>
                <span>₹{p.sellPrice}</span>
              </div>
            ))}
          </div>
        </Card>
      </CardGrid>
      {/* Modal (simplified) */}
      {modal && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <h2 style={{ color: '#4cb5a3' }}>{modal.charAt(0).toUpperCase() + modal.slice(1)} Table</h2>
            <div style={{ maxHeight: 400, overflow: 'auto', marginTop: 16 }}>
              {modal === 'products' && (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Name</th>
                      <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Sell Price</th>
                      <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id}>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{p.name}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>₹{p.sellPrice}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{p.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {modal === 'purchases' && (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Date</th>
                      <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchases.map(p => (
                      <tr key={p.id}>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{new Date(p.date).toLocaleDateString()}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>₹{p.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {modal === 'suppliers' && (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Name</th>
                      <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Lead Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suppliers.map(s => (
                      <tr key={s.id}>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{s.name}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{s.leadTime} days</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {modal === 'alerts' && (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Type</th>
                      <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alerts.map(a => (
                      <tr key={a.id}>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{a.type}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{a.active ? 'Yes' : 'No'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <button style={{
              marginTop: 24,
              background: '#4cb5a3',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '8px 24px',
              cursor: 'pointer'
            }} onClick={closeModal}>Close</button>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

// Modal styles
const ModalOverlay = styled.div`
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.18); z-index: 1000;
  display: flex; align-items: center; justify-content: center;
  animation: fadeIn 0.2s;
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
const ModalContent = styled.div`
  background: #fff; border-radius: 16px; padding: 2rem; min-width: 320px; max-width: 95vw;
  box-shadow: 0 4px 32px rgba(44, 62, 80, 0.16);
`;

export default Home;
