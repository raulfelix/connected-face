import React from 'react';
import styled from 'styled-components';
import { fontBold, fontMedium, focus } from '../styled/Fonts';
import Colours from '../styled/Colours';
import Media from '../styled/Media';
import googleIcon from '../../images/google.png';

const Container = styled.div`
  max-width: 300px;
  margin: auto;
  p {
    font-family: ${fontBold};
    }
  ul {
    padding: 0;
    margin: 0;
  }
  ul li {
    list-style: none;
  }

  @media ${Media.mobile} {
    margin-top: 2rem;
  }
`;

const SocialButton = styled.a`
  background-color: transparent;
  border: 3px solid ${Colours.primary};
  color: ${Colours.primary};
  display: flex;
  flex-direction: row;
  font-family: ${fontMedium};
  font-size: 16px;
  padding: 1.25rem;
  text-decoration: none;
 
  &:hover {
    cursor: pointer;
  }

  ${focus};

  img {
    display: inline-block;
    vertical-align: middle;
    height: 1.25rem;
    margin-right: 1rem;
    margin-bottom: 0;
  }
`

function SocialLogin() {
  return (
    <Container>
      <ul>
        <li>
          <SocialButton href="http://127.0.0.1:3333/login/google">
            <img src={googleIcon} alt="Google" />
            Login with Google
          </SocialButton>
        </li>
      </ul>
    </Container>
  );
}

export default SocialLogin;
