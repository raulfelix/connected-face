import React from 'react';
import { Row } from '../styled/Page';
import { H2, Type } from '../styled/Fonts';
import { List, ListItem } from '../styled/List';

function YourProjects({ projects }) {
  return (
    <Row className="col-sm-6">
      <H2 size="16px">Your projects</H2>
      <List>
        {
          projects.map(project => (
            <ListItem key={project.id} tabIndex={0}>
              <Type size={16} weight="heavy">{project.title}</Type>
              <Type>{project.description}</Type>
            </ListItem>
          ))
        }
      </List>
    </Row>
  );
}

export default YourProjects;
