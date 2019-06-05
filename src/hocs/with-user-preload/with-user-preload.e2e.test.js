import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {withUserPreload} from './with-user-preload';

Enzyme.configure({adapter: new Adapter()});

it(`preload user and render component`, () => {
  const MockComponent = () => <div />;
  const MockComponentWrapped = withUserPreload(MockComponent);

  const component = shallow(<MockComponentWrapped loadUser={() => new Promise(jest.fn())} />);

  expect(Object.keys(component).length).toEqual(0);
});
