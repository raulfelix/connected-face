import React, { useState } from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import Register from './Register';

const Panel = styled.div`
  min-width: 290px;
  display: inline-block;
  transition: all 300ms ease;
`
const PanelRegister = styled(Panel)`
  transform: translateX(4%);
`
const Container = styled.div`
  margin: auto auto 1.25rem auto;
  padding-bottom: 10px;
  overflow-x: hidden;
  width: 300px;
  white-space: nowrap;

  ${({type}) => type === 'register' ? `
    ${Panel}:first-child {
      opacity: 0;
      transform: translateX(-100%);
    }
    ${Panel}:last-child {
      opacity: 1;
      transform: translateX(-100%);
    }
  ` : `
    ${Panel}:first-child {
      opacity: 1;
    }
    ${Panel}:last-child {
      opacity: 0;
    }
  `}
`
function SignInContainer({ onComplete }) {
  const [type, setType] = useState('login')
  return (
    <Container type={type}>
      <Panel>
        <LoginForm
          onComplete={onComplete}
          onRegisterLink={() => setType('register')} />
      </Panel>
      <PanelRegister>
        <Register
          onComplete={onComplete}
          onLoginLink={() => setType('login')} />
      </PanelRegister>
    </Container>
  );
}

export default SignInContainer;
