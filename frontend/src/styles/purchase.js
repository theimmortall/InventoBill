
import styled from 'styled-components';

export const ContainerBox = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;

export const Header = styled.h2`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #4cb5a3;
  margin-bottom: 20px;
`;


export const AddButton = styled.button`
  background-color: #4cb5a3;
  border-radius: 8px;
  font-weight:bold;
  border: none;
  color: white;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #b9e5e8;
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1050;
`;
