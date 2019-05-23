import React from 'react';
import renderer from 'react-test-renderer';

import SmallMovieCard from './small-movie-card';

const film = {
  id: 1,
  name: `Dardjeeling Limited`,
  img: `img/dardjeeling-limited.jpg`,
  video: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  genre: `Adventure`
};

it(`renders correctly`, () => {
  const tree = renderer
    .create(
      <SmallMovieCard
        film={film}
        isPlaying={false}
      />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
