import styled from 'styled-components'
import Colours from './Colours';
import { focus } from './Fonts';

export const List = styled.ul`
  position: relative;
  padding: 0;
  margin: 0;
`
export const ListItem = styled.li`
  background-color: #ffffff;
  border-bottom: 1px dashed #ddd;
  margin-bottom: 1rem;
  padding: 0 0 0.5rem 0;
  position: relative;
  list-style: none;

  p:last-child {
    margin-bottom: 0;
  }

  &:hover {
    cursor: pointer;
  }

  ${focus}
`
