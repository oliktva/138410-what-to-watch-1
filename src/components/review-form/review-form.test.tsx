import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import {history} from '../../fixtures/router';

import {ReviewForm} from './review-form';
import {film} from '../../fixtures/films';
import {review} from '../../fixtures/reviews';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const moviePoster = shallow(<ReviewForm
    id={film.id}
    userReview={review}
    form={{}}
    setFieldValue={jest.fn()}
    addReview={jest.fn()}
    isDisabled={false}
    toggleDisabled={jest.fn()}
    history={history as any}
    match={{} as any}
    location={{} as any}
  />);

  expect(toJson(moviePoster)).toMatchSnapshot();
});
