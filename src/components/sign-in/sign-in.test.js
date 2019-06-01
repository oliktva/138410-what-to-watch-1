import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import {SignIn} from './sign-in';
import {user} from 'src/fixtures/user';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const main = shallow(<SignIn
    user={user}
    logInUser={jest.fn()}
    setEmailValue={jest.fn()}
    setPasswordValue={jest.fn()}
    showError={jest.fn()}
  />);
  expect(toJson(main)).toMatchSnapshot();
});
