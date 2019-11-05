import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Modal from 'react-modal';
import Pitch from './Pitch';
import Category from './Category';
import { HeadingLevelOne } from '../styled/Fonts';
import { Page } from '../styled/Page';
import { Button } from '../styled/Button';
import { scrollBodyTo } from '../../util/Scroller';
import { userExists } from '../../logic/Session';
import SignInContainer from '../auth/SignInContainer';
import SocialLogin from '../auth/SocialLogin';
import Media from '../styled/Media';
import Working from '../styled/Working';
import { useMutation } from '@apollo/react-hooks';

const PROJECT = gql`
  mutation createProject($input: ProjectInput!) {
    project(input: $input) {
      id
    }
  }
`;

const Blade = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 200px);
  position: relative;

  @media ${Media.mobile} {
    height: 100vh;
  }
  ${({ hidden = true }) => hidden && `
    &:after {
      content: '';
      background-color: rgba(255, 255, 255, 0.95);
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 2;
    }
  `}
`
const BladeContent = styled.div`
  flex: 1;
  max-width: 480px;
  margin: auto;
  padding: 0 1.25rem;
`

function NewProject({ history }) {
  const [steps, setSteps] = useState([
    {
      id: 'step-1',
      isHidden: false,
      isComplete: false
    },
    {
      id: 'step-2',
      isHidden: true,
      isComplete: false
    },
    {
      id: 'step-3',
      isHidden: true,
      isComplete: false
    },
    {
      id: 'step-4',
      isHidden: true,
      isComplete: false
    }
  ]);
  const [project, setProject] = useState({});

  useEffect(function() {
    console.log('Updated')
    if (loading === false) {
      // find active blade and scroll to it
      const item = steps.find(f => f.isHidden === false && f.isComplete === false)
      if (item) {
        scrollBodyTo(document.getElementById(item.id), 600)
      }
    }
  })

  const [saveProject, { loading, error }] = useMutation(
    PROJECT,
    {
      onCompleted(res) {
        console.log('Project saved with id:', res)
        history.replace('/user/profile')
      }
    }
  );

  return (
    <Page>
      <Modal
        isOpen={loading}
        contentLabel="Working"
      >
        <Working />
      </Modal>
      <Blade hidden={steps[0].isHidden} id={steps[0].id}>
        <BladeContent>
          <HeadingLevelOne className="mb-3">
            In just a couple steps you will be on your way to becoming connect-ed with different community partners...
          </HeadingLevelOne>
          <Button type="button" variant="secondary" onClick={() => {
            const arr = steps.slice(0)
            arr[0].isComplete = true
            arr[1].isHidden = false
            setSteps(arr)
          }}>Start</Button>
        </BladeContent>
      </Blade>
        <Blade hidden={steps[1].isHidden} id={steps[1].id}>
          <BladeContent>
            <HeadingLevelOne className="mb-3">
              Tell us about your project
            </HeadingLevelOne>
            <Pitch onNext={values => {
              const arr = steps.slice(0)
              arr[1].isComplete = true
              arr[2].isHidden = false
              setProject(values)
              setSteps(arr)
            }} />
          </BladeContent>
        </Blade>
        <Blade hidden={steps[2].isHidden} id={steps[2].id}>
          <BladeContent>
            <HeadingLevelOne className="mb-3">
              Add tags to connect with the right community
            </HeadingLevelOne>
            <Category
              isLastStep={userExists()}
              onComplete={values => {
                project.tags = values.tags;
                setProject(project);
                if (!userExists()) {
                  const arr = steps.slice()
                  console.log(arr)
                  arr[2].isComplete = true
                  arr[3].isHidden = false
                  setSteps(arr)
                } else {
                  console.log('complete', project)
                  saveProject({ variables: { input: project }})
                }
              }}
            />
          </BladeContent>
        </Blade>
        {
          !userExists() && (
            <Blade hidden={steps[3] && steps[3].isHidden} id="step-4">
              <BladeContent>
                <HeadingLevelOne className="mb-3">
                  Please login or create an account to save your project
                </HeadingLevelOne>
                <SignInContainer onComplete={data => {
                  console.log(data)
                    if (data.success) {
                      // save the project/show spinner getting things ready!
                      // then navigate to user view where they see their profile
                      // and projects they created and can manage interactions
                    } else {
                      // display error and try again
                    }
                  }}
                />
                <SocialLogin />
              </BladeContent>
            </Blade>
          )
        }
    </Page>
  );
}

export default withRouter(NewProject);
