import React from 'react';
import styled from 'styled-components';
import Colours from "./Colours";

export const fontRegular = 'interregular'
export const fontBold = 'interbold';
export const fontMedium = 'intermedium';

export const Text = styled.p`
  color: ${Colours.primary};
  font-family: ${fontMedium};
  margin-top: 0;
  margin-bottom: 1rem;
`

const HeadingLevelTwo = styled.h2`
  color: ${Colours.primary};
  display: inline-block;
  font-family: ${fontMedium};
  font-size: 26px;
  line-height: 1.6;
  margin: 0 0 1rem 0;

  ${({withUnderline}) => withUnderline && `
    &:after {
      content: '';
      background-color: ${Colours.lightPink};
      display: block;
      height: 10px;
      width: 100%;
      margin-top: -17px;
      margin-left: 10px;
    }
  `}
`

export function H2({children, withUnderline = false}) {
  return (
    <HeadingLevelTwo withUnderline={withUnderline}>{children}</HeadingLevelTwo>
  )
}