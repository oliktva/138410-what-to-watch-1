import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import PageWrapper from './page-wrapper';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const element = <div />;
  const pageWrapper = shallow(
    <PageWrapper>
      {element}
    </PageWrapper>
  );

  expect(toJson(pageWrapper)).toMatchSnapshot();
});
