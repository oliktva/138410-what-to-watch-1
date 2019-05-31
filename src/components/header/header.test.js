import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Header from './header';
import {user} from 'src/fixtures/user';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const header = shallow(<Header user={user} />);

  expect(toJson(header)).toMatchSnapshot();
});