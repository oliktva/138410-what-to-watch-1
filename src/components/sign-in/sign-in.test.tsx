import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import {SignIn} from './sign-in';
import {user as testUser} from '../../fixtures/user';
import {history} from '../../fixtures/router';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const main = shallow(<SignIn
    user={testUser}
    logInUser={jest.fn()}
    setFieldValue={jest.fn()}
    form={{}}
    showError={jest.fn()}
    history={history as any}
    location={{} as any}
    match={{} as any}
  />);
  expect(toJson(main)).toMatchSnapshot();
});
