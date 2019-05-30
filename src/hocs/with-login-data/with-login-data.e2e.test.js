import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withActiveCard from './with-login-data';

import {email as emailValue, password as passwordValue} from 'src/fixtures/user';

Enzyme.configure({adapter: new Adapter()});

it(`sets active card correctly`, () => {
  const MockComponent = () => <div />;
  const MockComponentWrapped = withActiveCard(MockComponent);

  const component = shallow(<MockComponentWrapped />);
  let {email, password} = component.props();

  expect(email).toEqual(undefined);
  expect(password).toEqual(undefined);

  component.props().setEmailValue(emailValue);
  email = component.props().email;
  expect(email).toEqual(emailValue);

  component.props().setPasswordValue(passwordValue);
  password = component.props().password;
  expect(password).toEqual(passwordValue);
});
