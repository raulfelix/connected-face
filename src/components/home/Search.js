import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Colours from '../styled/Colours';
import Dismiss from '../styled/Dismiss';
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