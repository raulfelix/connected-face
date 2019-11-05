import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { Page, Row } from '../styled/Page';
import ProfileForm from './ProfileForm';
import YourProjects from './YourProjects';

const GET_PROFILE = gql`
  query getProfile($email: String!) {
    profile(email: $email) {
      id
      firstName
      lastName
      position
      institution {
        id
        name
      }
    }
    projects {
      id
      title
      description
    }
  }
`;

function Profile() {
  const client = useApolloClient();
  const { email } = client.readQuery({
    query: gql`
      query UserEmail {
        email @client
      }
    `
  });

  const { data, loading, error } = useQuery(
    GET_PROFILE,
    { variables: { email }}
  );

  return (
    <Page>
      <Row className="col-sm-6 spacing-4x">
        {loading && (<span>loading</span>)}
        {error && <span>Error</span>}
        {
          (!loading && !error) && (
            <ProfileForm data={data} email={email} />
          )
        }
      </Row>
      {
        !loading && data.projects && (
          <YourProjects projects={data.projects} />
        )
      }
    </Page>
  );
}

export default Profile;
