import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LazyRoute from './LazyRoute';

import Home from './components/Home';
import SignUp from './components/SignUp';
import Header from './components/Header';
import Footer from './components/Footer';
import NewProject from './components/projects/NewProject';
import Authed from './components/Authed';
import OffCanvasNav from './components/navigation/OffCanvasNav';
import { Mobile } from './components/styled/Media';

const Login = React.lazy(() => import('./components/Login'));
const Profile = React.lazy(() => import('./components/profile/Profile'));

const AppRoutes = () => {
  const [nav, setNav] = useState(false);

  return (
    <Router>
      <main data-version={process.env.REACT_APP_VERSION}>
        <div style={{
          transition: 'all 300ms cubic-bezier(0.65, 0.05, 0.36, 1)',
          transform: `translate3d(${nav ? 'calc(100vw - 70px)' : '0'}, 0, 0)`
        }}>
        <Header nav={nav} onNavClick={() => setNav(!nav)}/>
        <Mobile>
          <OffCanvasNav />
        </Mobile>
        <Switch>
          <Route strict exact path="/" component={Home} />
          <Route strict exact path="/login/google" component={Authed} />
          <Route strict exact path="/register/education" component={SignUp} />
          <Route strict exact path="/register/partner" component={SignUp} />
          <Route strict exact path="/project/new" component={NewProject} />
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
        <Footer />
        </div>
      </main>
    </Router>
  );
}

export default AppRoutes;
