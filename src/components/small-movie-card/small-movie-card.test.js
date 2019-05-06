import React from 'react';
import renderer from 'react-test-renderer';

import SmallMovieCard from './small-movie-card';

const film = {
  name: `Dardjeeling Limited`,
  img: `img/dardjeeling-limited.jpg`
};

it(`renders correctly`, () => {
  const tree = renderer
    .create(
      <SmallMovieCard
        film={film}
        onClick={jest.fn()}
      />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
