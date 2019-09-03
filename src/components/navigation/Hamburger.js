import React from 'react';
import styled from 'styled-components';
import Colours from '../styled/Colours';

const Pickle = styled.span`
  top: 0;
  transition: top .2s ease-in-out .2s, transform .2s ease-in-out 0s;
`
const Cheese = styled.span`
  top: 9px;
  transition: opacity 0s ease-in-out .4s;
`

const Patty = styled.span`
  bottom: 0;
  transition: bottom .2s ease-in-out .2s, transform .2s ease-in-out 0s;
`

const Hamburger = styled.button`
  background: none;
  border: none;
  outline: none;
  height: 21px;
  width: 24px;
  padding: 0;
  margin: 0;
  position: absolute;
  left: 20px;
  top: 20px;

  ${Pickle}, ${Cheese}, ${Patty} {
    left: 0;
    background-color: ${Colours.primary};
    height: 3px;
    position: absolute;
    width: 24px;
  }

  &.active {
    ${Pickle} {
      top: 9px;
      transform: rotate(-45deg);
      transition: top .2s ease-in-out 0s, transform .2s ease-in-out .2s;
    }

    ${Cheese} {
      opacity: 0;
      top: 9px;
      transition: opacity 0s ease-in-out .1s;
    }

    ${Patty} {
      bottom: 9px;
      transform: rotate(45deg);
      transition: bottom .2s ease-in-out 0s, transform .2s ease-in-out .2s;
    }
  }
`
const BurgerButton = ({ nav, onClick }) => {
  return (
    <Hamburger
      type="button"
      className={`action-nav ${nav ? 'active': ''}`}
      aria-label="Toggle menu"
      onClick={() => onClick()}
    >
      <Pickle />
      <Cheese />
      <Patty />
    </Hamburger>
  );
}

export default BurgerButton;