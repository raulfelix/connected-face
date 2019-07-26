import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';

const LazyRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <Suspense fallback={<div />}>
          <Component {...props} />
        </Suspense>
      )}
    />
  );
};

export default LazyRoute;
