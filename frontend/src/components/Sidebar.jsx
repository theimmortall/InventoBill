import React, { useState } from 'react';
import { SidebarContainer, SidebarHeader, SidebarNav, SidebarNavItem, StyledLink, SidebarIcon, ToggleIcon, ToggleButton } from '../styles/Sidebar';
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineInventory } from "react-icons/md";
import logo from "../assets/logo3.png";
import { LuAlertTriangle } from "react-icons/lu";
import { BsGraphUp, BsPeople, BsFileText, BsGraphDown } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContainer style={{ width: isOpen ? '250px' : '53px' }}>
      <SidebarHeader>
        <Link to="/"> 
          <img src={logo} alt="Logo" style={{ width: '100%', cursor: 'pointer' }} />
        </Link>
      </SidebarHeader>
      <SidebarNav>
        <SidebarNavItem as={Link} to="/">
          <SidebarIcon><BsGraphUp /></SidebarIcon>
          <StyledLink>Dashboard</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem as={Link} to="/product">
          <SidebarIcon><AiOutlineProduct /></SidebarIcon>
          <StyledLink>Product</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem as={Link} to="/customer">
          <SidebarIcon><BsPeople /></SidebarIcon>
          <StyledLink>Customer</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem as={Link} to="/supplier">
          <SidebarIcon><BsPeople /></SidebarIcon>
          <StyledLink>Supplier</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem as={Link} to="/purchase">
          <SidebarIcon><TiShoppingCart /></SidebarIcon>
          <StyledLink>Purchase</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem as={Link} to="/admin/teachers">
          <SidebarIcon><MdOutlineInventory /></SidebarIcon>
          <StyledLink>Stock</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem as={Link} to="/admin/assignments">
          <SidebarIcon><BsFileText /></SidebarIcon>
          <StyledLink>Invoices</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem as={Link} to="/admin/performance">
          <SidebarIcon><BsGraphDown /></SidebarIcon>
          <StyledLink>Report</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem as={Link} to="/admin/alert">
          <SidebarIcon><LuAlertTriangle /></SidebarIcon>
          <StyledLink>Alert</StyledLink>
        </SidebarNavItem>
      </SidebarNav>
      <ToggleButton onClick={toggleSidebar}>
        <ToggleIcon isOpen={isOpen}>➜</ToggleIcon>
      </ToggleButton>
    </SidebarContainer>
  );
};

export default Sidebar;
