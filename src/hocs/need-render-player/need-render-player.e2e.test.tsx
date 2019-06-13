import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import needRenderPlayer from './need-render-player';

Enzyme.configure({adapter: new Adapter()});

it(`renders player correctly`, () => {
  const MockComponent = () => <div />;
  const MockComponentWrapped = needRenderPlayer(MockComponent);

  const component = shallow(<MockComponentWrapped />);
  const instance = component.instance() as any;

  expect(instance.state.withPlayer).toEqual(false);

  instance._toggleRenderPlayer();
  expect(instance.state.withPlayer).toEqual(true);

  instance._toggleRenderPlayer();
  expect(instance.state.withPlayer).toEqual(false);
});
