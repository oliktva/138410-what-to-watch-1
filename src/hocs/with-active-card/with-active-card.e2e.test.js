import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withActiveCard from './with-active-card';

const film = {
  id: 1,
  name: `Dardjeeling Limited`,
  img: `img/dardjeeling-limited.jpg`,
  video: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  genre: `Drama`
};

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
