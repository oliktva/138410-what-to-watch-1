import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SmallMovieCard from './small-movie-card';
import {film} from 'src/fixtures/films';

Enzyme.configure({adapter: new Adapter()});

it(`plays video correctly`, () => {
  const hoverHandler = jest.fn();

  const app = shallow(
    <SmallMovieCard
      film={film}
      isPlaying={false}
      onMouseEnter={hoverHandler}
    />
  );

  const playButton = app.find(`.small-movie-card`);
  playButton.simulate(`mouseEnter`);
  expect(hoverHandler).toHaveBeenCalledTimes(1);
  expect(hoverHandler).toHaveBeenCalledWith(film);
});
