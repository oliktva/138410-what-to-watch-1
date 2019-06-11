import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import {SignIn} from './sign-in';
import {user as testUser} from 'src/fixtures/user';
import {history as mockHistory} from 'src/fixtures/history';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const main = shallow(<SignIn
    history={mockHistory}
    user={testUser}
    logInUser={jest.fn()}
    setFieldValue={jest.fn()}
    form={{}}
    showError={jest.fn()}
  />);
  expect(toJson(main)).toMatchSnapshot();
});
