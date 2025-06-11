import styled from "styled-components";
import {Link} from "react-router-dom";

export const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${({ $isOpen }) => ($isOpen ? '250px' : '64px')};
  background: #000;
  color: #fff;
  transition: width 0.3s;
  z-index: 100;
  display: flex;
  flex-direction: column;
`;

export const SidebarHeader = styled.div`
  padding: 20px 0 20px 0;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SidebarNav = styled.ul`
  list-style: none;
  padding: 0;
`;

export const SidebarNavItem = styled.li`
  width: 100%;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #34495e;
  &:hover {
    background-color: #34495e;
  }
`;

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center; /* Center icon and text horizontally */
  gap: ${({ $isOpen }) => ($isOpen ? '10px' : '0')};
  color: #4cb5a3;
  text-decoration: none;
  width: 100%;
  height: 100%;
  padding: 18px 0;
  font-size: 1rem;
  white-space: nowrap;
  transition: gap 0.2s, padding 0.2s, background 0.2s;
  cursor: pointer;
  &:hover {
    background-color: #34495e;
    color: #fff;
  }
`;

export const SidebarIcon = styled.span`
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Always left-align */
  min-width: 24px;
`;

export const Logo = styled.img`
  width: 80px;
  height: auto;
  margin: 0 auto;
  display: block;
`;

export const ToggleButton = styled.div`
  position: absolute;
  top: 20px;
  right: 15px;
  width: 30px;
  height: 30px;
  background-color: #4cb5a3; /* Darker background */
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ToggleIcon = styled.span`
  color: white;
  font-size: 20px;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  background: #fff;
  table-layout: auto;
  @media (max-width: 700px) {
    display: block;
    overflow-x: auto;
    min-width: 600px;
  }
`;