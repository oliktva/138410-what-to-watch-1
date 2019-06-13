import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import SmallMovieCard from './small-movie-card';
import {film} from '../../fixtures/films';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const smallMovieCard = shallow(
    <SmallMovieCard
      film={film}
      isPlaying={false}
    />
  );
  expect(toJson(smallMovieCard)).toMatchSnapshot();
});
