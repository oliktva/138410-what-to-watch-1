import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {needLogin} from './need-login';
import paths from 'src/paths';
import {user as testUser} from 'src/fixtures/user';
import {history as mockHistory} from 'src/fixtures/history';

Enzyme.configure({adapter: new Adapter()});

it(`checks user and renders component`, () => {
  const MockComponent = () => <div />;
  const MockComponentWrapped = needLogin(MockComponent);

  const component = shallow(<MockComponentWrapped user={testUser} history={mockHistory} />);
  let {user} = component.props();

  expect(user).toEqual(user);
});

it(`checks user and redirects to sign in`, () => {
  const MockComponent = () => <div />;
  const MockComponentWrapped = needLogin(MockComponent);

  shallow(<MockComponentWrapped user={{}} history={mockHistory} />);

  expect(mockHistory.push).toHaveBeenCalledTimes(1);
  expect(mockHistory.push).toHaveBeenCalledWith(paths.login());
});
