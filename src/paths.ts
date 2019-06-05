const paths = {
  main: (): string => `/`,
  login: (): string => `/login`,
  mylist: (): string => `/mylist`,
  film: (id: number): string => `/film/${id}`,
  review: (id: number): string => `/film/${id}/review`
};

export default paths;
