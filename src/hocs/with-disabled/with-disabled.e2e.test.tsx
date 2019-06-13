import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withDisabled from './with-disabled';

Enzyme.configure({adapter: new Adapter()});

it(`toggles disabled correctly`, () => {
  const MockComponent = () => <div />;
  const MockComponentWrapped = withDisabled(MockComponent);

  const component = shallow(<MockComponentWrapped />);
  const instance = component.instance() as any;
  let isDisabled = instance.state.isDisabled;

  expect(isDisabled).toEqual(false);

  component.props().toggleDisabled({isDisabled: true});
  isDisabled = instance.state.isDisabled;
  expect(isDisabled).toEqual(true);
});
