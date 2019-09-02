import styled from 'styled-components'
import Colours from './Colours';
import { fontMedium, focus } from './Fonts';

export const Button = styled.button`
  background-color: transparent;
  border: 2px solid ${Colours.primary};
  border-radius: 3px;
  color: ${Colours.primary};
  font-size: 16px;
  font-weight: bold;
  font-weight: normal;
  font-family: ${fontMedium};
  letter-spacing: 0.5px;
  padding: 1rem 1.25rem;
  width: auto;

  &:hover {
    cursor: pointer;
  }

  ${focus};
`

