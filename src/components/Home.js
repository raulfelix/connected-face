import React, { useState, useEffect } from 'react';
import SVG from 'react-inlinesvg';
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom';

import { Button } from './styled/Button';
import { fontBold, H2, Text } from './styled/Fonts';
import { useStore } from '../AppState';
import { userExists } from '../logic/Session';
import Hero from './home/Hero';
import Media from './styled/Media';
import { Card, CardContent, CardCell } from './styled/Card';

const RecentProjectsTiles = styled.div`
  display: flex;
  & > div {
    flex: 1;
    max-width: 33.333%;
  }
`
const RecentProjects = styled.div`
  max-width: 800px;
  margin: auto;
  margin-top: 40px;
`

const RowLevel1 = styled.div`
  opacity: 0;
  animation-name: in;
  animation-duration: 900ms;
  animation-timing-function: ease;
  animation-iteration-count: infinte;
  animation-delay: 4s;
  animation-fill-mode: forwards;

  .about-module {
    margin-bottom: 40px;
    @media ${Media.tiny} {
      padding: 0 20px;
    }

    ${Text} {
      padding-left: 1rem;
    }
  }

  @media ${Media.mobile} {
    margin-top: -410px;
  }

  @keyframes in {
    0% {
      opacity: 0;
      transform: translate3d(0, 10%, 0);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`

function Home({ history }) {
  const { projectStore } = useStore()
  const [projects, setProjects] = useState([]);

  useEffect(function() {
    projectStore.recent().then(response => {
      setProjects(response);
    });
  }, []);

  return (
    <>
      <Hero />
      <RowLevel1 className="container-fluid">
        <div className="row">
          <div className="col-md-5 col-sm-12 about-module">
            <H2 withUnderline>About</H2>
            <Text>
              An initiative driven by todays educators to enrich the classroom experience for students and prepare them for the challenges of tomorrow.
            </Text>
            <Text>
              With engagement becoming an increasing challenging and teachers taking on more and more responsibility, finding ways to enrich the classroom can be time consuming and difficult. By using ConnectEd you can easily reach out into the community and seamlessly organise for people to come to school and work with you.
            </Text>
          </div>
          <div className="col-md-7">
            <Card>
              <CardContent>
                <CardCell>
                  <H2>I am an educator</H2>
                  <Text className="mb-3">Find people who can bring experiences and skills specific to your needs.</Text>
                  <Button type="button">Find collaborators</Button>
                </CardCell>
                <CardCell>
                  <H2>I work in industry</H2>
                  <Text className="mb-3">Find schools and projects which you can make a positive contribution to.</Text>
                  <Button type="button">Offer my expertise</Button>
                </CardCell>
              </CardContent>
            </Card>
          </div>
        </div>
      </RowLevel1>
      {/* { 
       !userExists() && (
         <>
            <p><Link to="/login">Login</Link></p>
            <div>
              <h3>Teacher/School</h3>
              <p><Link to="/register/education">Sign up</Link> as a teacher or school</p>
            </div>
            <div>
              <h3>Partner</h3>
              <p><Link to="/register/partner">Sign up</Link> as a partner</p>
            </div>
          </>
        ) */}
      {/* } */}
      {/* <RecentProjects>
        <h2>Recent projects</h2>
        <RecentProjectsTiles>
          {
            projects.map(p => (
              <div key={p.id}>
                <p>{p.title}</p>
                <p>{p.description}</p>
                <p><small>{p.name}</small></p>
              </div>
            ))
          }
        </RecentProjectsTiles>
      </RecentProjects> */}
    </>
  );
}

export default withRouter(Home);
