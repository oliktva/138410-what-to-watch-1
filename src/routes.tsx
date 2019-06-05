import React from 'react';
import {Switch, Route} from 'react-router-dom';

import paths from './paths';

import Main from 'src/components/main/main';
import SignIn from 'src/components/sign-in/sign-in';
import Favorite from 'src/components/favorite/favorite';

const Routes = (): JSX.Element => (
  <Switch>
    <Route path={paths.main()} exact component={Main} />
    <Route path={paths.login()} component={SignIn} />
    <Route path={paths.mylist()} component={Favorite} />
  </Switch>
);

export default Routes;
