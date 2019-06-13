import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withActiveTab from './with-active-tab';
import {tabs} from '../../fixtures/tabs';

Enzyme.configure({adapter: new Adapter()});

it(`sets active tab correctly`, () => {
  const MockComponent = () => <div />;
  const MockComponentWrapped = withActiveTab(tabs)(MockComponent);

  const component = shallow(<MockComponentWrapped />);
  const instance = component.instance() as any;
  let activeTab = instance.state.activeTab;

  expect(activeTab).toEqual(tabs[0]);

  component.props().setActiveTab(tabs[1]);
  activeTab = instance.state.activeTab;
  expect(activeTab).toEqual(tabs[1]);
});
