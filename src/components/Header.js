import React from 'react';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import { userExists } from '../logic/Session';
import { useStore } from '../AppState';
import { fontRegular, fontBold } from './styled/Fonts';
import Colours from './styled/Colours';

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
`;

function Header({ history }) {
  const { user } = useStore();
  return (
    <Container>
      <Logo to="/">
        <span>Connect</span>Ed
      </Logo>
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
    </Container>
  );
}

export default withRouter(Header);