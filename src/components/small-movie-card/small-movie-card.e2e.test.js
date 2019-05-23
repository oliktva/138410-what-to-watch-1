import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SmallMovieCard from './small-movie-card';

const film = {
  id: 1,
  name: `Dardjeeling Limited`,
  img: `img/dardjeeling-limited.jpg`,
  video: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  genre: `Drama`
};

Enzyme.configure({adapter: new Adapter()});

it(`plays video correctly`, () => {
  const hoverHandler = jest.fn();

  const app = shallow(
    <SmallMovieCard
      film={film}
      isPlaying={false}
      onMouseEnter={hoverHandler}
    />
  );

  const playButton = app.find(`.small-movie-card`);
  playButton.simulate(`mouseEnter`);
  expect(hoverHandler).toHaveBeenCalledTimes(1);
  expect(hoverHandler).toHaveBeenCalledWith(film);
});
