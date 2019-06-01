import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import {Favorites} from './favorites';

import {user} from 'src/fixtures/user';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const favorites = shallow(<Favorites user={user} />);

  expect(toJson(favorites)).toMatchSnapshot();
});
