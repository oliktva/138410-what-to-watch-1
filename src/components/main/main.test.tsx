import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import {Main} from './main';
import {films, film} from '../../fixtures/films';
import {genres} from '../../fixtures/genres';
import {user} from '../../fixtures/user';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const main = shallow(<Main
    filmsByGenre={films}
    genres={genres}
    user={user}
    loadFilms={jest.fn()}
    loadPromo={jest.fn()}
    promo={film}
  />);
  expect(toJson(main)).toMatchSnapshot();
});
