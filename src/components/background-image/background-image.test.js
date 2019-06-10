import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import BackgroundImage from './background-image';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const backgroundImage = shallow(<BackgroundImage image="test" name="test name" />);

  expect(toJson(backgroundImage)).toMatchSnapshot();
});
