import React from 'react';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import cog1 from '../../images/cog1.svg';
import cog2 from '../../images/cog2.svg';
import connector from '../../images/cog-connector.svg';
import { HeadingLevelOne, Text } from './Fonts';
import { Card, CardContent } from './Card';

const Container = styled.div`
  ${CardContent} {
    align-items: center;
  }

  ${Text} {
    margin-bottom: 0;
  }
`

const Icon = styled.div`
  width: 100px;
  height: 80px;
  margin-bottom: 1.5rem;
  position: relative;

  @keyframes spin {
    from {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(360deg)
    }
  }

  @keyframes spin2 {
    from {
      transform: rotate(360deg)
    }
    to {
      transform: rotate(0deg)
    }
  }

  .cog1 {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    z-index: 2;

    animation-name: spin;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }

  .cog2 {
    width: 64px;
    height: 64px;
    position: absolute;
    top: 8px;
    right: -1px;
    z-index: 2;

    animation-name: spin2;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }

  .connector {
    width: 60px;
    height: 60px;
    position: absolute;
    left: 5px;
    bottom: 0;
    z-index: 1;
  }
`

const Working = () => (
  <Container>
    <Card>
      <CardContent direction="column">
        <HeadingLevelOne>Hang on</HeadingLevelOne>
        <Icon>
          <SVG className="cog1" src={cog1} />
          <SVG className="cog2" src={cog2} />
          <SVG className="connector" src={connector} />
        </Icon>
        <Text>We are getting things ready for you...</Text>
      </CardContent>
    </Card>
  </Container> 
);

export default Working;
