import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withActiveCard from './with-active-card';

import {film} from '../../fixtures/films';

Enzyme.configure({adapter: new Adapter()});

it(`sets active card correctly`, () => {
  const MockComponent = () => <div />;
  const MockComponentWrapped = withActiveCard(MockComponent);

  const component = shallow(<MockComponentWrapped />);
  const instance = component.instance() as any;
  let activeCard = instance.state.activeCard;

  expect(activeCard).toEqual(null);

  component.props().setActiveCard(film);
  activeCard = instance.state.activeCard;
  expect(activeCard).toEqual(film);

  component.props().resetActiveCard();
  activeCard = instance.state.activeCard;
  expect(activeCard).toEqual(null);
});
