import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import styled from 'styled-components';
import { useTheme } from '../ThemeContext';
import { FaBars } from 'react-icons/fa';

const MainContent = styled.div`
  margin-left: ${({ $sidebarOpen }) => ($sidebarOpen ? '250px' : '64px')};
  transition: margin-left 0.3s;
  padding: 0;
  min-height: 100vh;
  background: #fafbfc;
`;

const HamburgerButton = styled.button`
  display: none;
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 1201;
  background: #fff;
  border: none;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(44,62,80,0.08);
  padding: 8px 10px;
  cursor: pointer;
  @media (max-width: 900px) {
    display: block;
  }
`;

const SidebarOverlay = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: ${({ $sidebarOpen }) => ($sidebarOpen ? 'block' : 'none')};
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.18);
    z-index: 1200;
  }
`;

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // On mobile, sidebar should be closed by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((open) => !open);

  return (
    <>
      <HamburgerButton onClick={toggleSidebar} aria-label="Open sidebar">
        <FaBars size={22} color="#4cb5a3" />
      </HamburgerButton>
      <SidebarOverlay $sidebarOpen={sidebarOpen} onClick={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <MainContent $sidebarOpen={sidebarOpen}>
        {children}
      </MainContent>
    </>
  );
};

export default Layout;