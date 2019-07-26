import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import { useStore } from '../AppState';

function SignUp({ history }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('edu');
  const { user } = useStore();

  return (
    <>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor="email">email</label>
        <input type="text" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
      </div>
      <div>
        <h4>Indicate what you are here for</h4>
        <label>I am an educator <input type="radio" value="edu" name="type" onChange={e => setType('edu')} /></label>
        <label>I am a professional <input type="radio" value="pro" name="type" onChange={e => setType('pro')}/></label>
      </div>
      <button type="button" onClick={async () => {
        const ok = await user.signup(username, email, password, type);
        if (ok) history.push(user.profileRoute);
      }}>Sign up</button>
    </>
  );
}

export default withRouter(SignUp);
