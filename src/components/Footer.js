import React from 'react';
import styled from 'styled-components';
import Colours from './styled/Colours';
import { Text } from './styled/Fonts';

const Container = styled.footer`
  border-top: 1px solid ${Colours.secondary};
  color: ${Colours.primary};
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
    font-size: 13px;
    margin-bottom: 0;
  }
`;

function Footer() {
  return (
    <Container className="container-fluid">
      <Text>Built for tired teachers... by a tired teacher</Text>
    </Container>
  );
}

export default Footer;