import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import {FullMovieCard} from './full-movie-card';
import {films, film} from 'src/fixtures/films';
import {reviews} from 'src/fixtures/reviews';
import {tabs} from 'src/fixtures/tabs';

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
    activeTab={tabs}
    setActiveTab={jest.fn()}
  />);

  expect(toJson(fullMovieCard)).toMatchSnapshot();
});
