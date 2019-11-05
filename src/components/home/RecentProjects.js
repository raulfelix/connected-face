import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import ProjectTile from '../projects/ProjectTile';
import { H2 } from '../styled/Fonts';

const GET_PROJECTS = gql`
  query projectsList {
    projects {
      id
      title
      description
      tags {
        id
        name
      }
    }
  }
`;

const StyledProjectTiles = styled.div`
  margin-top: 60px;

  .row .col-sm-3 {
    padding-left: 5px;
    padding-right: 5px;
  }
`

const RecentProjects = function() {
  const { data, loading, error } = useQuery(GET_PROJECTS);
  return (
    <StyledProjectTiles className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <H2 className="spacing-3x" withUnderline>Projects</H2>
          {
            loading && (<p>Loading projects...</p>)
          }
          {
            error && (<p>THERE WAS AN ERROR LOADING PROJECTS!</p>)
          }
        </div>
      </div>
      <div className="row">
        {
          data && data.projects && data.projects.map(p => (
            <ProjectTile key={p.id} project={p} />
          ))
        }
      </div>
    </StyledProjectTiles>
  );
}

export default RecentProjects;