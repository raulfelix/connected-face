import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import { fontRegular, fontBold, focus, fontMedium } from './styled/Fonts';
import Colours from './styled/Colours';
import Media, { Mobile, Tablet } from './styled/Media';
import Hamburger from './navigation/Hamburger';
import Search from './home/Search';
import LogoutButton from './LogoutButton';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

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

  @media ${Media.tiny} {
    left: 0;
    right: 0;
    position: fixed;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  height: 60px;

  a,
  button {
    background: none;
    border: none;
    border-bottom: 3px solid ${Colours.primary};
    color: ${Colours.primary};
    cursor: pointer;
    font-size: 1rem;
    font-family: ${fontMedium};
    padding: 0 0 2px 0;
    margin-left: 2rem;
    text-decoration: none;
    &:hover {
      cursor: pointer;
    }

    ${focus}
  }

  ${({isPrimary = false}) => isPrimary ? `
    left: 1rem;
    a { margin-left: 0; }
  ` : 'right: 1rem;' }
`

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

function Header({ nav, search, onSearchActive, onNavClick, history }) {
  const { data } = useQuery(IS_LOGGED_IN);
  return (
    <Container isNavActive={nav}>
      <Mobile>
        <Hamburger nav={nav} onClick={onNavClick} />
      </Mobile>
      <Logo to="/">
        <span>Connect</span>Ed
      </Logo>
      <Tablet>
        <Actions isPrimary>
          <Link to="/project/new">Start a project</Link>
        </Actions>
        <Actions>
          {
            data.isLoggedIn ? (
              <>
                <button type="button" onClick={async () => history.push('/user/profile')}>Profile</button>
                <LogoutButton />
              </>
            ) : (
              <button type="button" onClick={async () => history.push('/login')}>Login</button>
            )
          }
          <button type="button" onClick={() => onSearchActive(true)}>Search</button>
        </Actions>
      </Tablet>
      {
        search && <Search onDismiss={() => onSearchActive(false)} />
      }
    </Container>
  );
}

export default withRouter(Header);