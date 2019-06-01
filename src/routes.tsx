import React from 'react';
import {Switch, Route} from 'react-router-dom';

import paths from './paths';

import Main from 'src/components/main/main';
import SignIn from 'src/components/sign-in/sign-in';
import Favorites from 'src/components/favorites/favorites';

const Routes = (): JSX.Element => (
  <Switch>
    <Route path={paths.main()} exact component={Main} />
    <Route path={paths.login()} component={SignIn} />
    <Route path={paths.favorites()} component={Favorites} />
  </Switch>
);

export default Routes;
