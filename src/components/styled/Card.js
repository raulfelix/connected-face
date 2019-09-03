import styled from 'styled-components'
import Colours from './Colours';
import Media from './Media';

export const Card = styled.div`
  position: relative;
  &:after {
    content: '';
    background-color: ${Colours.lightPink};
    position: absolute;
    left: 10px;
    top: 0.5rem;
    right: -10px;
    bottom: -11px;
    z-index: 1;
  }
`
export const CardContent = styled.div`
  border: 4px solid ${Colours.secondary};
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({direction = 'row'}) => direction};
  padding: 1.25rem;
  position: relative;
  z-index: 2;
`
export const CardCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-basis: 50%;
  padding: 0.65rem;

  @media ${Media.tiny} {
    flex-basis: 100%;
  }
`