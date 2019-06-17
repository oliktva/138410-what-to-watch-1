import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Error from './error';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const error = shallow(<Error />);

  expect(toJson(error)).toMatchSnapshot();
});
