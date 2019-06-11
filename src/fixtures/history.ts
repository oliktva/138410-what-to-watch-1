interface History {
  push: () => void;
  goBack: () => void;
}

export const history: History = {push: jest.fn(), goBack: jest.fn()};
