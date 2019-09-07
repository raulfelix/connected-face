import React from 'react';
import styled from 'styled-components'
import Colours from '../styled/Colours';
import { fontMedium, focus } from '../styled/Fonts';

const Container = styled.span`
  border: 2px solid ${Colours.secondary};
  border-radius: 30px;
  color: ${Colours.secondary};
  font-size: 12px;
  font-family: ${fontMedium};
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 5px 24px 5px 10px;
  position: relative;
`
const Dismiss = styled.button`
  background: none;
  border: none;
  color: ${Colours.secondary};
  font-size: 16px;
  height: 24px;
  margin: 0;
  padding: 0;
  position: absolute;
  right: 0;
  top: 2px;
  width: 24px;
  ${focus};
`

const Pill = ({ data, onDimiss }) => (
  <Container>
    {data.name}
    <Dismiss
      type="button"
      className="icon-clear"
      aria-label="Remove tag"
      onClick={() => onDimiss(data)}
    />
  </Container>
)

export default Pill;