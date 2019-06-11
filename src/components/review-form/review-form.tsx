import React, {PureComponent, ReactElement, Fragment, ChangeEvent} from 'react';

import withFormFields from 'src/hocs/with-form-fields/with-form-fields';

const RATINGS = ['1', '2', '3', '4', '5'];

type Value = string | undefined;

interface Props {
  form: {
    [key: string]: Value
  };
  setFieldValue: (field: string, value: Value) => void;
  addReview: (comment: string, rating: string) => void;
}

class ReviewForm extends PureComponent<Props> {
  public constructor(props: Props) {
    super(props);

    this._handleFieldChange = this._handleFieldChange.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }
  public render(): ReactElement {
    console.log(this.props.form)
    return (
      <div className="add-review">
        <form className="add-review__form">
          <div className="rating">
            <div className="rating__stars">
              {RATINGS.map((r: string) => this._renderRating(r))}
            </div>
          </div>
          <div className="add-review__text">
            {this._renderText()}
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  private _handleFieldChange(evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const {setFieldValue} = this.props;
    const {target} = evt;

    if (target) {
      setFieldValue(target.name, target.value);
    }
  }

  private _handleFormSubmit() {
    const {form, addReview} = this.props;
    const rating = form.rating;
    const reviewText = form[`review-text`];

    if (reviewText && rating) {
      addReview(reviewText, rating);
    }
  }

  private _renderText() {
    const {form} = this.props;
    const reviewText = form[`review-text`];

    return (
      <textarea
        className="add-review__textarea"
        name="review-text"
        id="review-text"
        placeholder="Review text"
        onChange={this._handleFieldChange}
      >
        {reviewText}
      </textarea>
    )
  }

  private _renderRating(ratingValue: string) {
    const {form} = this.props;
    const rating = form.rating;

    return (
      <Fragment key={`rating-${ratingValue}`}>
        <input
          className="rating__input"
          id={`star-${ratingValue}`}
          type="radio"
          name="rating"
          value={ratingValue}
          checked={rating === ratingValue}
          onChange={this._handleFieldChange}
        />
        <label className="rating__label" htmlFor={`star-${ratingValue}`}>Rating {ratingValue}</label>
      </Fragment>
    )
  }
}

export {ReviewForm};

export default withFormFields(ReviewForm);