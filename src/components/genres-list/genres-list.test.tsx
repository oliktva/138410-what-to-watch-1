import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import {GenresList} from './genres-list';
import {genres} from '../../fixtures/genres';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const genresList = shallow(<GenresList
    genres={genres}
    active="All genres"
    setFilterByGenre={jest.fn()}
  />);
  expect(toJson(genresList)).toMatchSnapshot();
});
