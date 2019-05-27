import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import {Main} from './main';
import {films} from 'src/fixtures/films';
import {genre} from 'src/fixtures/genres';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const main = shallow(<Main
    films={films}
    genre={genre}
    loadFilms={jest.fn()}
    setFilterByGenre={jest.fn()}
  />);
  expect(toJson(main)).toMatchSnapshot();
});
