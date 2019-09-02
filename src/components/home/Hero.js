import React from 'react';
import SVG from 'react-inlinesvg';
import styled from 'styled-components'

import Colours from '../styled/Colours';
import { fontBold } from '../styled/Fonts';
import network from '../../images/hero.svg';
import networkSmall from '../../images/hero-sm.svg';
import Media, { Mobile, Tablet } from '../styled/Media';

const HeroContainer = styled.div`
  position: relative;
  margin: auto;
  max-width: 1400px;
  min-height: 400px;
  display: flex;
  justify-content: center;
  min-width: 443px;
`
const Hero = styled(SVG)`
  min-width: 1431px;
  @media ${Media.mobile} {
    min-width: 443px;
  }
`
const HeroTitle = styled.div`
  position: absolute;
  left: 150px;
  right: 0;
  top: 160px; 
  max-width: 460px;

  @media ${Media.mobile} {
    max-width: 300px;
    left: 50px;
    top: 70px;
  }

  h1 {
    color: ${Colours.primary};
    opacity: 0;
    font-size: 40px;
    font-family: ${fontBold};
    line-height: 1.2;
    margin: 0;

    @media ${Media.mobile} {
      font-size: 24px;
    }
    animation-name: message-in;
    animation-duration: 900ms;
    animation-timing-function: ease;
    animation-iteration-count: infinte;
    animation-delay: 1s;
    animation-fill-mode: forwards;
  }

  @keyframes message-in {
    0% {
      opacity: 0;
      transform: translate3d(0, 10%, 0);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`

export default function() {
  return (
    <HeroContainer>
      <Mobile>
        <Hero src={networkSmall} />
      </Mobile>
      <Tablet>
        <Hero src={network} />
      </Tablet>
      <HeroTitle>
        <h1>Bringing the real world into the classroom...</h1>
      </HeroTitle>
    </HeroContainer>
  );
}
