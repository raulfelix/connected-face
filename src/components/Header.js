import React from 'react';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import { userExists } from '../logic/Session';
import { useStore } from '../AppState';
import { fontRegular, fontBold, focus } from './styled/Fonts';
import Colours from './styled/Colours';
import { Mobile, Tablet } from './styled/Media';

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  max-width: 1400px;
  margin: auto;
  margin-bottom -60px;
  position: relative;
  z-index: 10;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 1rem;
  top: 0;
  height: 60px;

  button {
    background: none;
    border: none;
    border-bottom: 3px solid ${Colours.primary};
    color: ${Colours.primary};
    cursor: pointer;
    font-size: 16px;
    padding: 0 0 2px 0;

    &:hover {
      cursor: pointer;
    }

    ${focus}
  }
`;

const Logo = styled(Link)`
  color: ${Colours.primary};
  font-family: ${fontRegular};
  font-size: 20px;
  text-decoration: none;

  span {
    font-family: ${fontBold}
  }

  ${focus}
`;

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
function Header({ nav, history }) {
  const { user } = useStore();
  return (
    <Container>
      <Mobile>
        <Hamburger type="button" className={`action-nav ${nav ? 'active': ''}`} aria-label="Toggle menu">
          <Pickle />
          <Cheese />
          <Patty />
        </Hamburger>
      </Mobile>
      <Logo to="/">
        <span>Connect</span>Ed
      </Logo>
      <Tablet>
        <Actions>
          {
            userExists() ? (
              <>
                <button type="button" onClick={async () => history.push('/user/profile')}>Profile</button>
                <button type="button" onClick={async () => {
                  const res = await user.logout()
                  if (res) history.replace('/')
                }}>Logout</button>
              </>
            ) : (
              <>
                <button type="button" onClick={async () => history.push('/login')}>Login</button>
              </>
            )
          }
        </Actions>
      </Tablet>
    </Container>
  );
}

export default withRouter(Header);