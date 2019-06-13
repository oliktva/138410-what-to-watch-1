import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withFormFields from './with-form-fields';

import {email as emailValue, password as passwordValue} from '../../fixtures/user';

Enzyme.configure({adapter: new Adapter()});

it(`sets field value correctly`, () => {
  const MockComponent = () => <div />;
  const MockComponentWrapped = withFormFields(MockComponent);

  const component = shallow(<MockComponentWrapped />);
  const instance = component.instance() as any;
  let {email, password} = instance.state.form;

  expect(email).toEqual(undefined);
  expect(password).toEqual(undefined);

  component.props().setFieldValue(`email`, emailValue);
  email = instance.state.form.email;
  expect(email).toEqual(emailValue);

  component.props().setFieldValue(`password`, passwordValue);
  password = instance.state.form.password;
  expect(password).toEqual(passwordValue);
});
