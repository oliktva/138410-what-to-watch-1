import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import MovieCardReview from './movie-card-review';
import {film} from '../../fixtures/films';
import {review} from '../../fixtures/reviews';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const movieCardReview = shallow(<MovieCardReview
    header={<div />}
    film={film}
    userReview={review}
    addReview={jest.fn()}
  />);

  expect(toJson(movieCardReview)).toMatchSnapshot();
});
