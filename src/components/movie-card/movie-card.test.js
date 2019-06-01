import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import MovieCard from './movie-card';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const header = <div />;
  const movieCard = shallow(<MovieCard header={header} />);

  expect(toJson(movieCard)).toMatchSnapshot();
});
