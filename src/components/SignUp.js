import React, {useState} from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { useStore } from '../AppState';

const Title = styled.h1`
  font-size: 18px;
  font-weight: normal;
`;

function SignUp({ history }) {
  const path = history.location.pathname
  const type = path.includes('edu') ? 'edu' : 'pro';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useStore();

  return (
    <>
      { type === 'edu' && <Title>Sign up using your education email</Title>}
      { type === 'pro' && <Title>Sign up and fill in your profile</Title>}
      <div>
        <label htmlFor="email">email</label>
        <input type="text" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
      </div>
      <button type="button" onClick={async () => {
        const ok = await user.signup(email, email, password, type);
        if (ok) history.push(user.profileRoute);
      }}>Sign up</button>
    </>
  );
}

export default withRouter(SignUp);
