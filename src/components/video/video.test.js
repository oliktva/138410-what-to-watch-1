import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Video from './video';
import {film} from 'src/fixtures/films';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const tree = shallow(
    <Video
      src={film.previewVideoLink}
      preview={film.previewImage}
      isPlaying={false}
      onPlay={jest.fn()}
      onPause={jest.fn()}
    />);

  expect(toJson(tree)).toMatchSnapshot();
});
