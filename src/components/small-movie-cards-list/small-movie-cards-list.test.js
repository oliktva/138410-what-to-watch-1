import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import {SmallMovieCardsList} from './small-movie-cards-list';
import {films} from 'src/fixtures/films';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const tree = shallow(<SmallMovieCardsList
    films={films}
    activeCard={null}
    setActiveCard={jest.fn()}
    resetActiveCard={jest.fn()}
  />);
  expect(toJson(tree)).toMatchSnapshot();
});
