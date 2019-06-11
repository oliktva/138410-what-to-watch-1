import React, {PureComponent, ComponentClass} from 'react';

type Value = string | undefined;
interface Field {
  [key: string]: Value;
}

interface State {
  form: Field;
}

const withFormFields = (Component: any): ComponentClass<any> => {
  type P = ReturnType<typeof Component>;

  class WithFormFields extends PureComponent<P, State> {
    public constructor(props: P) {
      super(props);

      this.state = {
        form: {}
      };

      this._setFieldValue = this._setFieldValue.bind(this);
    }

    public render(): JSX.Element {
      const {form} = this.state;

      return (
        <Component
          {...this.props}
          form={form}
          setFieldValue={this._setFieldValue}
        />
      );
    }

    private _setFieldValue(field: string, value: Value): void {
      this.setState((state: State): State => ({
        form: {
          ...state.form,
          [field]: value
        }
      }));
    }
  }

  return WithFormFields;
};

export default withFormFields;
