import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import needRenderPlayer from './need-render-player';

Enzyme.configure({adapter: new Adapter()});

it(`renders player correctly`, () => {
  const MockComponent = () => <div />;
  const MockComponentWrapped = needRenderPlayer(MockComponent);

  const card = shallow(<MockComponentWrapped />);

  expect(card.state().withPlayer).toEqual(false);

  card.props().toggleRenderPlayer();
  expect(card.state().withPlayer).toEqual(true);

  card.props().toggleRenderPlayer();
  expect(card.state().withPlayer).toEqual(false);
});
