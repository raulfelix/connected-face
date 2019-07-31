import React from 'react';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import { userExists } from '../logic/Session';
import { useStore } from '../AppState';

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 16px;
`;

const HeaderActions = styled.div`
  button {
    background: none;
    border: none;
    color: blue;
    cursor: pointer;
    font-size: 14px;
  }
`;

const HeaderLogo = styled(Link)`
  color: #000;
  border-bottom: 1px solid;
  font-family: 'courier', sans-serif;
  text-decoration: none;
`;

function Header({ history }) {
  const { user } = useStore();
  return (
    <HeaderStyled>
      <HeaderLogo to="/">connectEd</HeaderLogo>
      {
        userExists() && <HeaderActions>
          <button onClick={async () => {
          const res = await user.logout()
          if (res) history.replace('/')
        }}>Logout</button>
        </HeaderActions>
      }
    </HeaderStyled>
  );
}

export default withRouter(Header);