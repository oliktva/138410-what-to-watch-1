import React, {PureComponent, ReactElement, ComponentClass} from 'react';

export const ITEMS_PER_PAGE = 20;

interface State {
  page: number;
}

const withPagination = (Component: any): ComponentClass<any> => {
  type P = ReturnType<typeof Component>;

  class WithPagination extends PureComponent<P, State> {
    public constructor(props: P) {
      super(props);

      this.state = {
        page: 1
      };

      this._goToNextPage = this._goToNextPage.bind(this);
      this._resetPage = this._resetPage.bind(this);
    }

    public render(): ReactElement {
      const {page} = this.state;

      return (
        <Component
          {...this.props}
          maxItemsPerPage={page * ITEMS_PER_PAGE}
          goToNextPage={this._goToNextPage}
          resetPage={this._resetPage}
        />
      );
    }

    private _resetPage(): void {
      this.setState({page: 1});
    }

    private _goToNextPage(): void {
      const {page} = this.state;

      this.setState({page: page + 1});
    }
  }

  return WithPagination;
};

export default withPagination;
