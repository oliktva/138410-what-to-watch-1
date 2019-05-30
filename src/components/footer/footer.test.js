import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Footer from './footer';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const footer = shallow(<Footer />);

  expect(toJson(footer)).toMatchSnapshot();
});
