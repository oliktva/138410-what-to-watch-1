import React from 'react';
import {Switch, Route} from 'react-router-dom';

import paths from './paths';

import Main from 'src/components/main/main';
import SignIn from 'src/components/sign-in/sign-in';
import Favorite from 'src/components/favorite/favorite';
import Movie from 'src/components/movie/movie';
import Review from 'src/components/review/review';


const Routes = (): JSX.Element => (
  <Switch>
    <Route path={paths.main()} exact component={Main} />
    <Route path={paths.login()} component={SignIn} />
    <Route path={paths.mylist()} component={Favorite} />
    <Route path={paths.review(`:id`)} component={Review} />
    <Route path={paths.film(`:id`)} component={Movie} />
  </Switch>
);

export default Routes;
