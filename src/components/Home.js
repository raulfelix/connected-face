import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Home({ history }) {
  return (
    <>
      <h1>Velcome to connect-ed!</h1>
      <p>You should <Link to="/signup">Sign up</Link></p>
      <p>You could also <Link to="/login">login instead</Link></p>
    </>
  );
}

export default withRouter(Home);
