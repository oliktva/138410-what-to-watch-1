import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import {Review} from './review';
import {film, reviews} from 'src/fixtures/films';
import {user} from 'src/fixtures/user';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const movieCardReview = shallow(<Review
    film={film}
    reviews={reviews}
    user={user}
    loadFilms={jest.fn()}
    loadReviews={jest.fn()}
    addReview={jest.fn()}
    match={{
      params: {id: 1}
    }}
  />);

  expect(toJson(movieCardReview)).toMatchSnapshot();
});
