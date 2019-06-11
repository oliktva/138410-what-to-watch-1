import {ReviewProps} from 'src/types/reviews';

export const reviews: ReviewProps[] = [{
  comment: `This is comment`,
  date: `54367894`,
  id: 1,
  rating: 8,
  user: {
    id: 2,
    name: `Joe`
  }
}, {
  comment: `This is comment`,
  date: `54367892`,
  id: 2,
  rating: 6,
  user: {
    id: 2,
    name: `Ivan`
  }
}, {
  comment: `This is comment`,
  date: `54367893`,
  id: 3,
  rating: 7,
  user: {
    id: 2,
    name: `Tatiana`
  }
}];

export const review: ReviewProps = reviews[0];
