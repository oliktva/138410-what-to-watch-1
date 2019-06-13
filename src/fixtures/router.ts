interface History {
  push: () => void;
  goBack: () => void;
}

interface Match {
  isExact: boolean;
  path: string;
  url: string;
  params: any;
}

export const history: History = {push: jest.fn(), goBack: jest.fn()};

export const match: Match = {
  isExact: false,
  path: `/test`,
  url: `/test`,
  params: {id: `1`}
};
