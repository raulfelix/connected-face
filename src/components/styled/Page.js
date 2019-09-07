import styled from 'styled-components';
import Media from './Media';

export const Page = styled.div`
  min-height: calc(100vh - 220px);
  padding-top: 100px;

  @media ${Media.mobile} {
    min-height: auto;
    padding-top: 100px;
  }
`;