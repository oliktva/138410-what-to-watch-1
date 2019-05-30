import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import {Main} from './main';
import {films} from 'src/fixtures/films';
import {genres} from 'src/fixtures/genres';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const main = shallow(<Main
    filmsByGenre={films}
    genres={genres}
    loadFilms={jest.fn()}
  />);
  expect(toJson(main)).toMatchSnapshot();
});
