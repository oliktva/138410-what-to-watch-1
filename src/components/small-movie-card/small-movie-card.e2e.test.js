import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SmallMovieCard from './small-movie-card';

const film = {
  name: `Dardjeeling Limited`,
  img: `img/dardjeeling-limited.jpg`
};

Enzyme.configure({adapter: new Adapter()});

it(`App correctly renders after relaunch`, () => {
  const clickHandler = jest.fn();

  const app = shallow(
    <SmallMovieCard
      film={film}
      onClick={clickHandler}
    />
  );

  const startButton = app.find(`.small-movie-card__link`);
  startButton.simulate(`click`);
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
