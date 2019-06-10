import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import MoviePoster from './movie-poster';
import {film} from 'src/fixtures/films';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const moviePoster = shallow(<MoviePoster image="test" name="test name" />);

  expect(toJson(moviePoster)).toMatchSnapshot();
});
