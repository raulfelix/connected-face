import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Home({ history }) {
  return (
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
  );
}

export default withRouter(Home);
