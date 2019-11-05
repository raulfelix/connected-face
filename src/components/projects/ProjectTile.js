import React from 'react';
import styled from 'styled-components';
import { Text, H3 } from '../styled/Fonts';
import Colours from '../styled/Colours';

const Container = styled.div`
  background-color: ${Colours.white};
  border: 4px solid ${Colours.secondary};
  height: 100%;
  max-height: 600px;
  padding: 10px;
`

const ProjectTile = ({ project: { title, description, tags }}) => (
  <div className="col-sm-3">
    <Container>
      <H3 withUnderline={false}>{title}</H3>
      <Text>{description}</Text>
      { tags.map(t => (
        <div key={t.id}>{t.name}</div>
      ))}
    </Container>
  </div>
)

export default ProjectTile;