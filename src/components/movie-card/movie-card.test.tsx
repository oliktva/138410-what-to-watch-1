import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import {MovieCard} from './movie-card';

import {film} from '../../fixtures/films';
import {reviews} from '../../fixtures/reviews';
import {history} from '../../fixtures/router';

Enzyme.configure({adapter: new Adapter()});

describe(`renders correctly`, () => {
  it(`renders without player`, () => {
    const header = <div />;
    const movieCard = shallow(
      <MovieCard
        header={header}
        film={film}
        reviews={reviews}
        withPlayer={false}
        toggleRenderPlayer={jest.fn()}
        addToFavorites={jest.fn()}
        removeFromFavorites={jest.fn()}
        history={history as any}
        match={{} as any}
        location={{} as any}
      />
    );

    expect(toJson(movieCard)).toMatchSnapshot();
  });

  it(`renders with player`, () => {
    const header = <div />;
    const movieCard = shallow(
      <MovieCard
        header={header}
        film={film}
        reviews={reviews}
        withPlayer={true}
        toggleRenderPlayer={jest.fn()}
        addToFavorites={jest.fn()}
        removeFromFavorites={jest.fn()}
        history={history as any}
        match={{} as any}
        location={{} as any}
      />
    );

    expect(toJson(movieCard)).toMatchSnapshot();
  });
});
