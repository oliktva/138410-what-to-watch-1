import React, {PureComponent, ComponentClass, ReactElement} from 'react';

interface State {
  activeTab: string;
}

const withActiveTab = (tabs: string[]) => (Component: any): ComponentClass<any> => {
  type P = ReturnType<typeof Component>;

  class WithActiveTab extends PureComponent<P, State> {
    public constructor(props: P) {
      super(props);

      this.state = {
        activeTab: tabs[0]
      };

      this._setActiveTab = this._setActiveTab.bind(this);
    }

    public render(): ReactElement {
      const {activeTab} = this.state;

      return (
        <Component
          {...this.props}
          activeTab={activeTab}
          setActiveTab={this._setActiveTab}
        />
      );
    }

    private _setActiveTab(tab: string): void {
      this.setState({activeTab: tab});
    }
  }

  return WithActiveTab;
};

export default withActiveTab;
