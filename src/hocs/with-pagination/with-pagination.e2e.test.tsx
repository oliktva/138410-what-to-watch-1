import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withPagination, {ITEMS_PER_PAGE} from './with-pagination';

Enzyme.configure({adapter: new Adapter()});

it(`paginates correctly`, () => {
  const MockComponent = () => <div />;
  const MockComponentWrapped = withPagination(MockComponent);

  const component = shallow(<MockComponentWrapped />);
  const instance = component.instance() as any;

  let page = instance.state.page;
  let perPage = component.props().maxItemsPerPage;

  expect(page).toEqual(1);
  expect(perPage).toEqual(ITEMS_PER_PAGE);

  component.props().goToNextPage();
  page = instance.state.page;
  perPage = component.props().maxItemsPerPage;
  expect(page).toEqual(2);
  expect(perPage).toEqual(2 * ITEMS_PER_PAGE);


  component.props().resetPage();
  page = instance.state.page;
  perPage = component.props().maxItemsPerPage;
  expect(page).toEqual(1);
  expect(perPage).toEqual(ITEMS_PER_PAGE);
});
