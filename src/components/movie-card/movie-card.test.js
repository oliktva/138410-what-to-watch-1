import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import {MovieCard} from './movie-card';

import {film} from 'src/fixtures/films';

Enzyme.configure({adapter: new Adapter()});

describe(`renders correctly`, () => {
  it(`renders without player`, () => {
    const header = <div />;
    const movieCard = shallow(
      <MovieCard
        header={header}
        film={film}
        withPlayer={false}
        toggleRenderPlayer={jest.fn()}
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
        withPlayer={true}
        toggleRenderPlayer={jest.fn()}
      />
    );

    expect(toJson(movieCard)).toMatchSnapshot();
  });
});
