import styled from "styled-components";
import {Link} from "react-router-dom";

export const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ isOpen }) => (isOpen ? '250px' : '80px')};
  width: 250px;
  height: 100%;
  background-color: black; /* Dark blue background  #2c3e50 */
  color: white;
  overflow-y: auto; /* Enable vertical scrolling */
  padding-top: 60px;
  transition: width 0.3s ease; /* Smooth width transition */
  z-index: 100; /* Ensure sidebar stays above content */
`;

export const SidebarHeader = styled.div`
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

export const SidebarNav = styled.ul`
  list-style: none;
  padding: 0;
`;

export const SidebarNavItem = styled.li`
  text-decoration:none;
  display: flex;
  align-items: center;
  padding: 12px 20px;
  font-size: 18px;
  border-bottom: 1px solid #34495e; /* Darker border */
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #34495e; /* Darker background on hover */
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #4cb5a3;
  margin-left: 10px;
`;

export const SidebarIcon = styled.div`
  color: white;  
  font-size: 1.3rem; 
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px; 
`;

export const Logo = styled.img`
  width: 80%;
  height: auto;
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