const paths = {
  main: (): string => `/`,
  login: (): string => `/login`,
  mylist: (): string => `/mylist`,
  film: (id: number | string): string => `/film/${id}`,
  review: (id: number | string): string => `/film/${id}/review`,
  error: (): string => `/error`
};

export default paths;
