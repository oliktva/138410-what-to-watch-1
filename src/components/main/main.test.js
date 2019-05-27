import React from 'react';
import renderer from 'react-test-renderer';

import {Main} from './main';

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
}];

const genre = `All genres`;

it(`renders correctly`, () => {
  const tree = renderer
    .create(<Main
      films={films}
      genre={genre}
      loadFilms={jest.fn()}
      setFilterByGenre={jest.fn()}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
