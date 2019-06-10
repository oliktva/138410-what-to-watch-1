import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withActiveTab from './with-active-tab';

import {tabs} from 'src/fixtures/tabs';

Enzyme.configure({adapter: new Adapter()});

it(`sets active tab correctly`, () => {
  const MockComponent = () => <div />;
  const MockComponentWrapped = withActiveTab(tabs)(MockComponent);

  const card = shallow(<MockComponentWrapped />);
  let activeTab = card.props().activeTab;

  expect(activeTab).toEqual(tabs[0]);

  card.props().setActiveTab(tabs[1]);
  activeTab = card.props().activeTab;
  expect(activeTab).toEqual(tabs[1]);
});
