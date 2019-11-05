import React from 'react';
import { useApolloClient} from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';

const LogoutButton = function({ history }) {
  const client = useApolloClient();
  return (
    <button type="button" onClick={() => {
      sessionStorage.clear();
      client.writeData({ data: { isLoggedIn: false, email: null, id: null } });
      client.clearStore()
      // todo show some sort of modal animation of logging out and redirect home
      history.replace('/')
    }}>Logout</button>
  );
}

export default withRouter(LogoutButton);