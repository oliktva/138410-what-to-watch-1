import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import {film} from 'src/fixtures/films';

import CardButtons from './card-buttons';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const cardButtons = shallow(<CardButtons
    film={film}
    onPlayButtonClick={jest.fn()}
    onFavoritesToggle={jest.fn()}
  />);

  expect(toJson(cardButtons)).toMatchSnapshot();
});
