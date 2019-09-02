import React, { useState, useEffect } from 'react';
import SVG from 'react-inlinesvg';
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom';

import Colours from './styled/Colours';
import { Button } from './styled/Button';
import { fontBold, H2, Text } from './styled/Fonts';
import { useStore } from '../AppState';
import { userExists } from '../logic/Session';
import Hero from './home/Hero';
import Media from './styled/Media';

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

const Card = styled.div`
  position: relative;

  &:after {
    content: '';
    background-color: ${Colours.lightPink};
    position: absolute;
    left: 10px;
    top: 0.5rem;
    right: -10px;
    bottom: -11px;
    z-index: 1;
  }
`
const CardContent = styled.div`
  border: 4px solid ${Colours.secondary};
  display: flex;
  flex-wrap: wrap;
  padding: 1.25rem;
  position: relative;
  z-index: 2;
`
const CardCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-basis: 50%;
  padding: 0.65rem;

  @media ${Media.tiny} {
    flex-basis: 100%;
  }
`

const RowLevel1 = styled.div`
  opacity: 0;
  animation-name: in;
  animation-duration: 900ms;
  animation-timing-function: ease;
  animation-iteration-count: infinte;
  animation-delay: 5s;
  animation-fill-mode: forwards;

  .about-module {
    margin-bottom: 40px;
    @media ${Media.small} {
      padding: 0 20px;
    }

    ${Text} {
      padding-left: 1rem;
    }
  }

  .connect-module {
    @media ${Media.small} {
      padding: 0 40px;
    }
  }

  @media ${Media.mobile} {
    margin-top: -370px;
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
          <div className="col-md-7 connect-module">
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
