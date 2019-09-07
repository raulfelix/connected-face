import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useStore } from '../AppState';

function Authed({ history }) {
  const { user } = useStore()

  useEffect(function() {
    const search = window.location.search
    const token = search.split('=')[1];

    // add token to session storage
    user.writeAuth(token)

    // redirect to home screen
    history.replace('/')
  }, []);

  return (
    <></>
  );
}

export default withRouter(Authed);
