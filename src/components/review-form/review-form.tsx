import React, {
  PureComponent,
  ReactElement,
  Fragment,
  ChangeEvent,
  FormEvent
} from 'react';
import {compose} from 'redux';
import {withRouter, RouteComponentProps} from 'react-router-dom';

import paths from 'src/paths';
import withFormFields from 'src/hocs/with-form-fields/with-form-fields';
import withDisable from 'src/hocs/with-disabled/with-disabled';

import {ReviewProps} from 'src/types/films';

const RATINGS = [`1`, `2`, `3`, `4`, `5`];
const RATING_KEY = `rating`;
const REVIEW_TEXT_KEY = `review-text`;
const REVIEW_TEXT_MIN = 50;
const REVIEW_TEXT_MAX = 400;

type Value = string | undefined;

interface OwnProps {
  id: number;
  userReview: ReviewProps | null;
  form: {
    [key: string]: Value;
  };
  setFieldValue: (field: string, value: Value) => void;
  addReview: (id: number, comment: string, rating: string) => Promise<void>;
  isDisabled: boolean;
  toggleDisabled: ({isDisabled}: {isDisabled: boolean}) => void;
}

type Props = OwnProps & RouteComponentProps;

class ReviewForm extends PureComponent<Props> {
  public constructor(props: Props) {
    super(props);

    this._handleFieldChange = this._handleFieldChange.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  public componentDidMount(): void {
    const {userReview, setFieldValue} = this.props;

    if (userReview) {
      setFieldValue(RATING_KEY, userReview.rating.toString());
      setFieldValue(REVIEW_TEXT_KEY, userReview.comment);
    }
  }

  public render(): ReactElement {
    const {isDisabled} = this.props;

    return (
      <div className="add-review">
        <form className="add-review__form" onSubmit={this._handleFormSubmit}>
          <div className="rating">
            <div className="rating__stars">
              {RATINGS.map((r: string): ReactElement => this._renderRating(r))}
            </div>
          </div>
          <div className="add-review__text">
            {this._renderText()}
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit" disabled={!this._isEnabled() || isDisabled}>Post</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  private _isEnabled(): boolean {
    const {form} = this.props;
    const rating = form[RATING_KEY];
    const reviewText = form[REVIEW_TEXT_KEY];

    return typeof rating === `string` && typeof reviewText === `string` &&
      reviewText.length >= REVIEW_TEXT_MIN && reviewText.length <= REVIEW_TEXT_MAX;
  }

  private _handleFieldChange(evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const {setFieldValue} = this.props;
    const {target} = evt;

    if (target) {
      setFieldValue(target.name, target.value);
    }
  }

  private _handleFormSubmit(evt: FormEvent<HTMLFormElement>): void {
    const {id, form, addReview, toggleDisabled, history} = this.props;
    const rating = form[RATING_KEY];
    const reviewText = form[REVIEW_TEXT_KEY];

    evt.preventDefault();
    toggleDisabled({isDisabled: true});

    if (reviewText && rating) {
      addReview(id, reviewText, rating)
        .then((): void => {
          toggleDisabled({isDisabled: false});
          history.push(paths.film(id));
        })
        .catch((): void => {
          toggleDisabled({isDisabled: false});
        });
    }
  }

  private _renderText(): ReactElement {
    const {form, isDisabled} = this.props;
    const reviewText = form[`review-text`];

    return (
      <textarea
        className="add-review__textarea"
        name={REVIEW_TEXT_KEY}
        id="review-text"
        placeholder="Review text"
        value={reviewText}
        onChange={this._handleFieldChange}
        minLength={REVIEW_TEXT_MIN}
        maxLength={REVIEW_TEXT_MAX}
        disabled={isDisabled}
      />
    );
  }

  private _renderRating(ratingValue: string): ReactElement {
    const {form, isDisabled} = this.props;
    const rating = form.rating;

    return (
      <Fragment key={`rating-${ratingValue}`}>
        <input
          className="rating__input"
          id={`star-${ratingValue}`}
          type="radio"
          name={RATING_KEY}
          value={ratingValue}
          checked={rating === ratingValue}
          onChange={this._handleFieldChange}
          disabled={isDisabled}
        />
        <label className="rating__label" htmlFor={`star-${ratingValue}`}>Rating {ratingValue}</label>
      </Fragment>
    );
  }
}

export {ReviewForm};

const wrapper = compose(
  withFormFields,
  withDisable,
  withRouter
);

export default wrapper(ReviewForm);
