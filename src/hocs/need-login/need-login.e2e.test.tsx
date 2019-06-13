import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {needLogin} from './need-login';
import paths from '../../paths';
import {user as testUser} from '../../fixtures/user';
import {history} from '../../fixtures/router';

Enzyme.configure({adapter: new Adapter()});

it(`checks user and renders component`, () => {
  const MockComponent = () => <div />;
  const MockComponentWrapped = needLogin(MockComponent);

  const component = shallow(<MockComponentWrapped user={testUser} history={history} />);
  const instance = component.instance() as any;
  const {user} = instance.props;

  expect(user).toEqual(testUser);
});

it(`checks user and redirects to sign in`, () => {
  const MockComponent = () => <div />;
  const MockComponentWrapped = needLogin(MockComponent);

  shallow(<MockComponentWrapped user={{}} history={history} />);

  expect(history.push).toHaveBeenCalledTimes(1);
  expect(history.push).toHaveBeenCalledWith(paths.login());
});
