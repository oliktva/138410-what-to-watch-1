import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import {App} from './app';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly with isAuthorizationRequired equals false`, () => {
  const app = shallow(<App isAuthorizationRequired={false} />);

  expect(toJson(app)).toMatchSnapshot();
});

it(`renders correctly with isAuthorizationRequired equals true`, () => {
  const app = shallow(<App isAuthorizationRequired={true} />);

  expect(toJson(app)).toMatchSnapshot();
});
