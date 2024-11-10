import styled from 'styled-components';

export const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 25px;
  background-color: #ffffff;
  color: #333;
  font-family: Arial, sans-serif;
  z-index: 1000;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 10px 15px;
  }
`;

export const Logo = styled.img`
  width: 12%;
  height: auto;

  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

export const NavigationLinks = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    margin-top: 10px;
  }
`;

export const NavLink = styled.a`
  margin-right: 20px;
  color: #333;
  text-decoration: none;
  font-size: 18px;
  font-weight: 600;

  &:hover {
    color: #0073e6;
  }

  @media screen and (max-width: 768px) {
    margin: 0 10px;
    font-size: 16px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Aligns content to the right */
  width: 98%; 
  margin-top:10px;
  @media screen and (max-width: 768px) {
    margin-top: 10px;
    margin-right: 0;
    justify-content: center;
  }
`;


export const UserProfile = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: black;
  font-weight: bold;

  &:hover {
    color: #4cb5a3;
  }
`;

export const UserImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 8px;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 12px); // Spacing from UserProfile
  left: 50%;
  transform: translateX(-50%) translateY(-10px); // Center align below UserProfile
  background: #ffffff;
  border-radius: 10px;
  width: 180px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;

  ${({ open }) => open && `
    opacity: 1;
    transform: translateX(-50%) translateY(0); // Smooth dropdown appearance
    pointer-events: auto;
  `}

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #ffffff transparent;
  }
`;


export const DropdownItem = styled.button`
  width: 100%;
  padding: 12px 20px;
  background: none;
  border: none;
  text-align: left;
  color: #555;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.25s ease;

  &:hover {
    background: #f5f5f5;
  }

  &:first-child {
    font-weight: bold;
    color: #333;
  }
`;

export const LogoutButton = styled(DropdownItem)`
  color: #e63946;
`;

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #6BD4E7, #58a6d6);
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding-top: 100px;

  @media screen and (max-width: 768px) {
    padding-top: 70px;
  }
`;

export const Title = styled.h1`
  font-size: 38px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);

  @media screen and (max-width: 768px) {
    font-size: 30px;
  }
`;

export const LoremTextContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-size: 18px;
  color: #ffffff;
  text-align: justify;
  padding: 0 25px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
    padding: 0 15px;
  }
`;
