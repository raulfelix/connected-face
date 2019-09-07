import styled from 'styled-components'
import Colours from './Colours';
import { fontMedium, focus } from './Fonts';

export const Button = styled.button`
  border: 2px solid ${Colours.primary};
  border-radius: 3px;
  font-size: 16px;
  font-weight: bold;
  font-weight: normal;
  font-family: ${fontMedium};
  letter-spacing: 0.5px;
  min-width: 150px;
  padding: .65rem 1.25rem;
  width: auto;

  &:disabled {
    opacity: 0.3;
  }

  &:hover {
    cursor: pointer;
  }

  ${focus};

  ${({variant = ''}) => variant !== 'primary' && `
    background-color: transparent;
    color: ${Colours.primary};
  `}

  ${({variant = ''}) => variant === 'primary' && `
    background-color: ${Colours.primary};
    color: ${Colours.white};
  `}

  ${({variant = ''}) => variant === 'highlight' && `
    background-color: ${Colours.secondary};
    border-color: ${Colours.secondary};
    color: ${Colours.white};
  `}

  ${({stretch = false}) => stretch && `
    width: 100%;
  `}
`

