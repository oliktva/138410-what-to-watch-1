import {ActionCreator, SET_GENRE, LOAD_FILMS_SUCCESS} from './reducer';

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

const genre = `Drama`;

describe(`ActionCreator`, () => {
  it(`setFilterByGenre`, () => {
    expect(ActionCreator.setFilterByGenre(genre)).toEqual({
      type: SET_GENRE,
      payload: genre
    });
  });

  it(`loadFilms`, () => {
    expect(ActionCreator.loadFilms()).toEqual({
      type: LOAD_FILMS_SUCCESS,
      payload: films
    });
  });
});
