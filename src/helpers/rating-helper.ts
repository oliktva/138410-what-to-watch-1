export const getRatingDescription = (rating: number): string => {
  if (rating >= 0 && rating <= 3) {
    return `Bad`;
  } else if (rating <= 5) {
    return `Normal`;
  } else if (rating <= 8) {
    return `Good`;
  }

  return `Awesome`;
};

export const getRatingDecimal = (rating: number): string => {
  const decimalRating = Math.floor(rating * 10) / 10;
  return decimalRating.toLocaleString();
};
