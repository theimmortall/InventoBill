// Home.js
import React from 'react';
import { Navbar, Logo, NavigationLinks, NavLink, ButtonsContainer, LoginButton, GuestButton, HomeContainer, SchoolInfo, SchoolImage, Title, LoremTextContainer, AdminRegisterLink } 
from '../styles/styles'
import { LoremIpsum } from 'lorem-ipsum';
import bg1 from "../assets/logo2.png";
import { useNavigate } from 'react-router-dom'; 

const lorem = new LoremIpsum();

const Home = () => {
  const navigate = useNavigate();
  const loremText = lorem.generateParagraphs(1);

  const handleLoginClick = () => {
    navigate('/sign-up');
  };

  return (
    <>
      <Navbar>
        <Logo src={bg1} alt="Logo" />
        <NavigationLinks>
          <NavLink href="#">Home</NavLink>
        </NavigationLinks>
        <ButtonsContainer>
          <LoginButton onClick={handleLoginClick}>Sign In</LoginButton>
        </ButtonsContainer>
      </Navbar>
    </>
  );
};

export default Home;