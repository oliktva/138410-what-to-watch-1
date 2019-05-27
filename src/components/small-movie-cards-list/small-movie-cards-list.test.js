import React from 'react';
import renderer from 'react-test-renderer';

import {SmallMovieCardsList} from './small-movie-cards-list';

const films = [{
  id: 1,
  name: `Fantastic Beasts`,
  img: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  video: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  genre: `Adventure`
}, {
  id: 2,
  name: `Bohemian Rhapsody`,
  img: `img/bohemian-rhapsody.jpg`,
  video: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  genre: `Adventure`
}, {
  id: 3,
  name: `Macbeth`,
  img: `img/macbeth.jpg`,
  video: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  genre: `Adventure`
}, {
  id: 4,
  name: `Aviator`,
  img: `img/aviator.jpg`,
  video: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  genre: `Adventure`
}, {
  id: 5,
  name: `We need to talk about Kevin`,
  img: `img/we-need-to-talk-about-kevin.jpg`,
  video: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  genre: `Adventure`
}, {
  id: 6,
  name: `What We Do in the Shadows`,
  img: `img/what-we-do-in-the-shadows.jpg`,
  video: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  genre: `Adventure`
}, {
  id: 7,
  name: `Revenant`,
  img: `img/revenant.jpg`,
  video: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  genre: `Adventure`
}, {
  id: 8,
  name: `Johnny English`,
  img: `img/johnny-english.jpg`,
  video: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  genre: `Adventure`
}, {
  id: 9,
  name: `Shutter Island`,
  img: `img/shutter-island.jpg`,
  video: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  genre: `Adventure`
}, {
  id: 10,
  name: `Pulp Fiction`,
  img: `img/pulp-fiction.jpg`,
  video: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  genre: `Adventure`
}, {
  id: 11,
  name: `No Country for Old Men`,
  img: `img/no-country-for-old-men.jpg`,
  video: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  genre: `Adventure`
}, {
  id: 12,
  name: `Snatch`,
  img: `img/snatch.jpg`,
  video: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  genre: `Adventure`
}, {
  id: 13,
  name: `Moonrise Kingdom`,
  img: `img/moonrise-kingdom.jpg`,
  video: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  genre: `Adventure`
}, {
  id: 14,
  name: `Seven Years in Tibet`,
  img: `img/seven-years-in-tibet.jpg`,
  video: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  genre: `Adventure`
}, {
  id: 15,
  name: `Midnight Special`,
  img: `img/midnight-special.jpg`,
  video: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  genre: `Adventure`
}, {
  id: 16,
  name: `War of the Worlds`,
  img: `img/war-of-the-worlds.jpg`,
  video: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  genre: `Adventure`
}, {
  id: 17,
  name: `Dardjeeling Limited`,
  img: `img/dardjeeling-limited.jpg`,
  video: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  genre: `Adventure`
}, {
  id: 18,
  name: `Orlando`,
  img: `img/orlando.jpg`,
  video: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  genre: `Adventure`
}, {
  id: 19,
  name: `Mindhunter`,
  img: `img/mindhunter.jpg`,
  video: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  genre: `Adventure`
}, {
  id: 20,
  name: `Midnight Special`,
  img: `img/midnight-special.jpg`,
  video: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  genre: `Adventure`
}];

it(`renders correctly`, () => {
  const tree = renderer
    .create(<SmallMovieCardsList
      films={films}
      activeCard={null}
      setActiveCard={jest.fn()}
      resetActiveCard={jest.fn()}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
