import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import {FullMovieCard} from './full-movie-card';
import {films, film} from '../../fixtures/films';
import {reviews} from '../../fixtures/reviews';
import {tabs} from '../../fixtures/tabs';
import {history} from '../../fixtures/router';

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
    activeTab={tabs[0]}
    setActiveTab={jest.fn()}
    history={history as any}
    match={{} as any}
    location={{} as any}
  />);

  expect(toJson(fullMovieCard)).toMatchSnapshot();
});
