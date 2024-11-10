import React, { useEffect, useState } from 'react';
import { ButtonsContainer, UserProfile, UserImage, Dropdown, LogoutButton } from '../styles/styles';
import { useNavigate } from 'react-router-dom';
import bg3 from "../assets/user.png";

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState('User'); // Replace with actual username
  const userImage = bg3;

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
    setIsLoggedIn(false); // Update login state to hide Sidebar
    navigate('/sign-up');
  };

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
    </>
  );
};

export default Home;
