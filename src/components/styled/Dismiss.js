import React from 'react';
import styled from 'styled-components';
import Colours from './Colours';

const Dismiss = styled.button`
  background: none;
  border: none;
  outline: none;
  height: 21px;
  width: 24px;
  padding: 0;
  margin: 0;
  position: absolute;
  right: 1.25rem;
  top: 1.25rem;

  &:hover {
    cursor: pointer;
  }

  &:after,
  &:before {
    content: '';
    left: 0;
    background-color: ${Colours.secondary};
    height: 3px;
    position: absolute;
    width: 24px;
  }

  &:after {
    top: 9px;
    transform: rotate(-45deg);
  }

  &:before {
    bottom: 9px;
    transform: rotate(45deg);
  }
`

export default function({onClick}) {
  return (
    <Dismiss type="button" onClick={onClick}>
      <i className="icon-window-close" />
    </Dismiss>
  )
};