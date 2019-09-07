import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Pitch from './Pitch';
import Category from './Category';
import { useStore } from '../../AppState';
import { HeadingLevelOne } from '../styled/Fonts';
import { Page } from '../styled/Page';
import { Button } from '../styled/Button';
import { scrollBodyTo } from '../../util/Scroller';

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 0 1.25rem;
`;

const Blade = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 500px;
  position: relative;

  ${({ hidden = true }) => hidden && `
    &:after {
      content: '';
      background-color: rgba(255, 255, 255, 0.95);
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  `}
`
const BladeContent = styled.div`

`

const flow = [
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
  }
]

function NewProject() {
  const { projectStore } = useStore();
  const [steps, setSteps] = useState(flow);
  const [project, setProject] = useState({});

  useEffect(function() {
    console.log('Updated', flow)
    // find active blade and scroll to it
    const item = flow.find(f => f.isHidden === false && f.isComplete == false)
    scrollBodyTo(document.getElementById(item.id), 600)
  })

  return (
    <Page>
      <Container className="container-fluid">
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
              setSteps(arr)
            }} />
          </BladeContent>
        </Blade>
        <Blade hidden={steps[2].isHidden} id={steps[2].id}>
          <BladeContent>
            <HeadingLevelOne className="mb-3">
              Tag your project to connect with the right community
            </HeadingLevelOne>
            <Category
              onNext={() => setSteps([true, true, true])}
              onComplete={values => {
                project.tags = values.tags;
                setProject(project);
                console.log('complete', project)
                // create project now
                projectStore.create({
                  ...project.pitch,
                  tags: project.tags
                })
              }}
            />
          </BladeContent>
        </Blade>
      </Container>
    </Page>
  );
}

export default NewProject;
