import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import { useStore } from '../AppState';

function Login({ history }) {
  const { user } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <h1>Please login</h1>
      <div>
        <label htmlFor="email">email</label>
        <input type="text" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="Password">Password</label>
        <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
      </div>
      <button type="button" onClick={async () => {
        const ok = await user.login(email, password)
        if (ok) history.replace(user.profileRoute);
      }}>Login</button>
    </>
  );
}

export default withRouter(Login);
