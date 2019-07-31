import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userExists } from './logic/Session';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        userExists() ? (
          <Suspense fallback={<div />}>
            <Component {...props} />
          </Suspense>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
