import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import {FullMovieCard} from './full-movie-card';
import {films, film, reviews} from 'src/fixtures/films';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const fullMovieCard = shallow(<FullMovieCard
    header={<div />}
    film={film}
    relatedFilms={films}
    reviews={reviews}
    withPlayer={false}
    toggleRenderPlayer={jest.fn()}
    addToFavorites={jest.fn()}
    removeFromFavorites={jest.fn()}
  />);

  expect(toJson(fullMovieCard)).toMatchSnapshot();
});
