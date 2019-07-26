import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LazyRoute from './LazyRoute';

// import ScrollToTop from './ScrollToTop';
import Home from './components/Home';
import SignUp from './components/SignUp';

const Login = React.lazy(() => import('./components/Login'));
const Profile = React.lazy(() => import('./components/Profile'));

const AppRoutes = () => (
  <Router>
    <main data-version={process.env.REACT_APP_VERSION}>
      <Switch>
        <Route strict exact path="/" component={Home} />
        <Route strict exact path="/signup" component={SignUp} />
        <LazyRoute strict exact path="/login" component={Login} />
        <PrivateRoute strict exact path="/user/profile" component={Profile} />
        {/* <Route
          render={() => (
            <Suspense fallback={<div />}>
              <AppNotFound />
            </Suspense>
          )}
        /> */}
      </Switch>
    </main>
  </Router>
);

export default AppRoutes;
