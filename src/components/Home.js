
import React from 'react';
import styled from 'styled-components'
import { withRouter } from 'react-router-dom';
import { Button } from './styled/Button';
import { H2, Text } from './styled/Fonts';
import { Card, CardContent, CardCell } from './styled/Card';
import Media from './styled/Media';
import Hero from './home/Hero';
import RecentProjects from './home/RecentProjects';

const RowLevel1 = styled.div`
  opacity: 0;
  animation-name: in;
  animation-duration: 900ms;
  animation-timing-function: ease;
  animation-iteration-count: infinte;
  animation-delay: 1.5s;
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
                  <Button type="button" variant="secondary">Find collaborators</Button>
                </CardCell>
                <CardCell>
                  <H2>I work in industry</H2>
                  <Text className="mb-3">Find schools and projects which you can make a positive contribution to.</Text>
                  <Button type="button" variant="secondary">Offer my expertise</Button>
                </CardCell>
              </CardContent>
            </Card>
          </div>
        </div>
      </RowLevel1>
      <RecentProjects />
    </>
  );
}

export default withRouter(Home);
