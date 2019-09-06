import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Colours from '../styled/Colours';
import { fontBold } from '../styled/Fonts';

const SearchContainer = styled.div`
  background-color: rgba(255,255,255,0.95);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
const SearchInput = styled.div`
  margin-top: 40px;
  input {
    border: none;
    border-bottom: 3px solid ${Colours.secondary};
    box-sizing: border-box;
    color: ${Colours.primary};
    font-size: 24px;
    font-family: ${fontBold};
    width: 100%;

    &:focus {
      outline: none;
    }
  }
`
const Dismiss = styled.div`
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
 
const Search = ({ onDismiss }) => {
  const input = useRef(null)
  useEffect(function() {
    input.current.focus()
  }, [])

  return (
    <SearchContainer>
      <div className="container-fluid">
        <Dismiss onClick={() => onDismiss()} />
        <div className="row">
          <div className="col-xs-12">
            <SearchInput>
              <input type="text" ref={input} />
            </SearchInput>
          </div>
        </div>
      </div>
    </SearchContainer>
  )
}

export default Search