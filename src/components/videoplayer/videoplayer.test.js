import React from 'react';
import renderer from 'react-test-renderer';

import Videoplayer from './videoplayer';

const film = {
  id: 1,
  name: `Dardjeeling Limited`,
  img: `img/dardjeeling-limited.jpg`,
  video: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
};

it(`renders correctly`, () => {
  const tree = renderer
    .create(
      <Videoplayer
        src={film.video}
        preview={film.img}
        isPlaying={false}
        onPlay={jest.fn()}
        onPause={jest.fn()}
      />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
