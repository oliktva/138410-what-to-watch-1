import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import {ScrollToTop} from './scroll-to-top';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const backgroundImage = shallow(
  <ScrollToTop location={{pathname: '/test'} as any} history={{} as any} match={{} as any}>
    <div />
  </ScrollToTop>
);

  expect(toJson(backgroundImage)).toMatchSnapshot();
});
