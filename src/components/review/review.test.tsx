import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import {Review} from './review';
import {film} from 'src/fixtures/films';
import {reviews} from 'src/fixtures/reviews';
import {user} from 'src/fixtures/user';
import {match} from 'src/fixtures/router';
const mock: any = jest.fn();

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const movieCardReview = shallow(<Review
    film={film}
    reviews={reviews}
    user={user}
    loadFilms={jest.fn()}
    loadReviews={jest.fn()}
    addReview={jest.fn()}
    match={match}
    location={mock}
    history={mock}
  />);

  expect(toJson(movieCardReview)).toMatchSnapshot();
});
