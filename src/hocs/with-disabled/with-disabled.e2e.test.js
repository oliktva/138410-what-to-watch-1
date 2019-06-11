import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withDisabled from './with-disabled';

Enzyme.configure({adapter: new Adapter()});

it(`toggles disabled correctly`, () => {
  const MockComponent = () => <div />;
  const MockComponentWrapped = withDisabled(MockComponent);

  const component = shallow(<MockComponentWrapped />);
  let isDisabled = component.props().isDisabled;

  expect(isDisabled).toEqual(false);

  component.props().toggleDisabled({isDisabled: true});
  isDisabled = component.props().isDisabled;
  expect(isDisabled).toEqual(true);
});
