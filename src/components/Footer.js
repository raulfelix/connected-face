import React from 'react';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import { fontRegular } from './styled/Fonts';
import Colours from './styled/Colours';

const Container = styled.footer`
  border-top: 1px solid ${Colours.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  margin-top: 80px;
  position: relative;

  &:before {
    content: '';
    background-color: ${Colours.lightPink};
    height: 10px;
    border-radius: 10px;
    position: absolute;
    left: 3%;
    right: 20%;
    top: -5px;
    z-index: -1;
  }
  p {
    font-family: ${fontRegular};
    font-size: 13px;
  }
`;

function Footer({ history }) {
  return (
    <Container className="container-fluid">
      <p>Built for tired teachers... by a tired teacher</p>
    </Container>
  );
}

export default withRouter(Footer);