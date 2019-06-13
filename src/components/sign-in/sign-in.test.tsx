import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import {SignIn} from './sign-in';
import {user as testUser} from 'src/fixtures/user';
import {history as mockHistory} from 'src/fixtures/router';

Enzyme.configure({adapter: new Adapter()});

it(`renders correctly`, () => {
  const main = shallow(<SignIn
    history={mockHistory as any}
    location={{} as any}
    match={{} as any}
    user={testUser}
    logInUser={jest.fn()}
    setFieldValue={jest.fn()}
    form={{}}
    showError={jest.fn()}
  />);
  expect(toJson(main)).toMatchSnapshot();
});
