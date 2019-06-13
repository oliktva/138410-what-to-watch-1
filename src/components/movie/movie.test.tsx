import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import {Movie} from './movie';
import {films, film} from '../../fixtures/films';
import {reviews} from '../../fixtures/reviews';
import {user} from '../../fixtures/user';
import {match} from '../../fixtures/router';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const movie = shallow(<Movie
    films={films}
    film={film}
    reviews={reviews}
    user={user}
    loadFilms={jest.fn()}
    loadReviews={jest.fn()}
    location={{} as any}
    history={{} as any}
    match={match}
  />);

  expect(toJson(movie)).toMatchSnapshot();
});
