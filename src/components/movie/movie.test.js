import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import {Movie} from './movie';
import {films, film} from 'src/fixtures/films';
import {reviews} from 'src/fixtures/reviews';
import {user} from 'src/fixtures/user';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const movie = shallow(<Movie
    films={films}
    film={film}
    reviews={reviews}
    user={user}
    loadFilms={jest.fn()}
    loadReviews={jest.fn()}
    match={{params: {id: `3`}}}
  />);

  expect(toJson(movie)).toMatchSnapshot();
});
