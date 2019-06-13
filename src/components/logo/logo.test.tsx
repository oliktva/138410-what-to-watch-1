import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Logo from './logo';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const logo = shallow(<Logo />);

  expect(toJson(logo)).toMatchSnapshot();
});
