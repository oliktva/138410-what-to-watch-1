import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withPagination, {ITEMS_PER_PAGE} from './with-pagination';

Enzyme.configure({adapter: new Adapter()});

it(`paginates correctly`, () => {
  const MockComponent = () => <div />;
  const MockComponentWrapped = withPagination(MockComponent);

  const card = shallow(<MockComponentWrapped />);
  let page = card.state().page;
  let perPage = card.props().maxItemsPerPage;

  expect(page).toEqual(1);
  expect(perPage).toEqual(ITEMS_PER_PAGE);

  card.props().goToNextPage();
  page = card.state().page;
  perPage = card.props().maxItemsPerPage;
  expect(page).toEqual(2);
  expect(perPage).toEqual(2 * ITEMS_PER_PAGE);


  card.props().resetPage();
  page = card.state().page;
  perPage = card.props().maxItemsPerPage;
  expect(page).toEqual(1);
  expect(perPage).toEqual(ITEMS_PER_PAGE);
});
