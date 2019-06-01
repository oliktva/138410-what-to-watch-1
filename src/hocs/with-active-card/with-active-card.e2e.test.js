import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withActiveCard from './with-active-card';

import {film} from 'src/fixtures/films';

Enzyme.configure({adapter: new Adapter()});

it(`sets active card correctly`, () => {
  const MockComponent = () => <div />;
  const MockComponentWrapped = withActiveCard(MockComponent);

  const card = shallow(<MockComponentWrapped />);
  let activeCard = card.props().activeCard;

  expect(activeCard).toEqual(null);

  card.props().setActiveCard(film);
  activeCard = card.props().activeCard;
  expect(activeCard).toEqual(film);

  card.props().resetActiveCard();
  activeCard = card.props().activeCard;
  expect(activeCard).toEqual(null);
});
