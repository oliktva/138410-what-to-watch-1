import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Breadcrumbs from './breadcrumbs';
import {film} from 'src/fixtures/films';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const backgroundImage = shallow(<Breadcrumbs film={film} />);

  expect(toJson(backgroundImage)).toMatchSnapshot();
});
