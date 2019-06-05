import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import {Player} from './player';

import {film} from 'src/fixtures/films';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const movieCard = shallow(
    <Player
      film={film}
      isPlaying={false}
      isFullscreen={false}
      fulltime={180}
      currentTime={1}
      play={jest.fn()}
      stop={jest.fn()}
      openFullscren={jest.fn()}
      closeFullscreen={jest.fn()}
      setCurrentTime={jest.fn()}
      setFulltime={jest.fn()}
      closePlayer={jest.fn()}
    />
  );

  expect(toJson(movieCard)).toMatchSnapshot();
});
