import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import {Favorite} from './favorite';

import {films} from 'src/fixtures/films';
import {user} from 'src/fixtures/user';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const favorites = shallow(
    <Favorite
      user={user}
      favorite={films}
      loadFavorite={jest.fn()}
    />
  );

  expect(toJson(favorites)).toMatchSnapshot();
});
