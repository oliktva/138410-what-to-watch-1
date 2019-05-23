import React from 'react';
import renderer from 'react-test-renderer';

import GenresList from './GenresList';

const genres = [`All genres`, `Drama`, `Adventure`, `Thriller`];

it(`renders correctly`, () => {
  const tree = renderer
    .create(<GenresList
      genres={genres}
      active="All genres"
      onGenreChange={jest.fn()}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
