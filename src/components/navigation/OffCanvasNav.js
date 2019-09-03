import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Colours from '../styled/Colours';
import { fontMedium } from '../styled/Fonts';

const Container = styled.nav`
  background-color: ${Colours.lightPink};
  color: ${Colours.white};
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  width: calc(100vw - 70px);
  transform: translateX(-100%);
`
const NavLink = styled(Link)`
  color: ${Colours.primary};
  display: block;
  font-family: ${fontMedium};
  padding: 20px;
  text-decoration: none;
`
const OffCanvasNav = ({ onLinkClick }) => {
  return (
    <Container>
      <NavLink to="/" onClick={onLinkClick}>Home</NavLink>
      <NavLink to="/login" onClick={onLinkClick}>Login</NavLink>
    </Container>
  );
}

export default OffCanvasNav;