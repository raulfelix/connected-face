import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStore } from './AppState';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useStore();
  console.log(user)
  return (
    <Route
      {...rest}
      render={props =>
        user.exists() ? (
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
