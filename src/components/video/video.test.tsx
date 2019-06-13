import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Video from './video';
import {film} from '../../fixtures/films';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const tree = shallow(
    <Video
      src={film.previewVideoLink}
      preview={film.previewImage}
      isPlaying={false}
      isFullscreen={false}
      synchronizePlaying={jest.fn()}
      togglePlaying={jest.fn()}
      setCurrentTime={jest.fn()}
      closeFullscreen={jest.fn()}
      setFulltime={jest.fn()}
      needReset={false}
    />);

  expect(toJson(tree)).toMatchSnapshot();
});
