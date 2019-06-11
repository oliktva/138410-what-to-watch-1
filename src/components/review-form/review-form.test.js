import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import {history as mockHistory} from 'src/fixtures/history';

import ReviewForm from './review-form';
import {film, review} from 'src/fixtures/films';

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
    history={mockHistory}
  />);

  expect(toJson(moviePoster)).toMatchSnapshot();
});
