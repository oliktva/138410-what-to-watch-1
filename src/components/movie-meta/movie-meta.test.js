import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import MovieMeta from './movie-meta';
import {film} from 'src/fixtures/films';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const movieMeta = shallow(<MovieMeta film={film} />);

  expect(toJson(movieMeta)).toMatchSnapshot();
});
