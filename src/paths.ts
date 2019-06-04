const paths = {
  main: (): string => `/`,
  login: (): string => `/login`,
  mylist: (): string => `/mylist`,
  film: (id: string): string => `/film/${id}`,
  addReview: (id: string): string => `/film/${id}/review`
};

export default paths;
