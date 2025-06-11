import React from 'react';
import { SidebarContainer, SidebarHeader, SidebarNav, SidebarNavItem, StyledLink } from '../styles/Sidebar';
import { AiOutlineProduct } from "react-icons/ai";
import logo from "../assets/logo3.png";
import { LuTriangleAlert } from 'react-icons/lu';
import { BsGraphUp, BsPeople, BsFileText} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";
import { GoPeople } from "react-icons/go";
import styled from 'styled-components';

const SidebarIcon = styled.span`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
`;

const Sidebar = ({ isOpen, toggleSidebar }) => (
  <SidebarContainer $isOpen={isOpen}>
    <SidebarHeader>
      <Link to="/">
        <img src={logo} alt="Logo" style={{ width: '100%', cursor: 'pointer' }} />
      </Link>
    </SidebarHeader>
    <SidebarNav>
      <SidebarNavItem>
        <StyledLink to="/" $isOpen={isOpen}>
          <SidebarIcon><BsGraphUp /></SidebarIcon>
          {isOpen && "Dashboard"}
        </StyledLink>
      </SidebarNavItem>
      <SidebarNavItem>
        <StyledLink to="/product">
          <SidebarIcon><AiOutlineProduct /></SidebarIcon>
          {isOpen && "Product"}
        </StyledLink>
      </SidebarNavItem>
      <SidebarNavItem>
        <StyledLink to="/customer">
          <SidebarIcon><BsPeople /></SidebarIcon>
          {isOpen && "Customer"}
        </StyledLink>
      </SidebarNavItem>
      <SidebarNavItem>
        <StyledLink to="/supplier">
          <SidebarIcon><GoPeople /></SidebarIcon>
          {isOpen && "Supplier"}
        </StyledLink>
      </SidebarNavItem>
      <SidebarNavItem>
        <StyledLink to="/purchase">
          <SidebarIcon><TiShoppingCart /></SidebarIcon>
          {isOpen && "Purchase"}
        </StyledLink>
      </SidebarNavItem>
      <SidebarNavItem>
        <StyledLink to="/invoice">
          <SidebarIcon><BsFileText /></SidebarIcon>
          {isOpen && "Invoices"}
        </StyledLink>
      </SidebarNavItem>
      <SidebarNavItem>
        <StyledLink to="/admin/alert">
          <SidebarIcon><LuTriangleAlert /></SidebarIcon>
          {isOpen && "Alert"}
        </StyledLink>
      </SidebarNavItem>
    </SidebarNav>
  </SidebarContainer>
);

export default Sidebar;
