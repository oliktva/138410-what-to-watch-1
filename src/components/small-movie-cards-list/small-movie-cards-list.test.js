import React from 'react';
import renderer from 'react-test-renderer';

import SmallMovieCardsList from './small-movie-cards-list';

const films = [{
  name: `Fantastic Beasts`,
  img: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`
}, {
  name: `Bohemian Rhapsody`,
  img: `img/bohemian-rhapsody.jpg`
}, {
  name: `Macbeth`,
  img: `img/macbeth.jpg`
}, {
  name: `Aviator`,
  img: `img/aviator.jpg`
}, {
  name: `We need to talk about Kevin`,
  img: `img/we-need-to-talk-about-kevin.jpg`
}, {
  name: `What We Do in the Shadows`,
  img: `img/what-we-do-in-the-shadows.jpg`
}, {
  name: `Revenant`,
  img: `img/revenant.jpg`
}, {
  name: `Johnny English`,
  img: `img/johnny-english.jpg`
}, {
  name: `Shutter Island`,
  img: `img/shutter-island.jpg`
}, {
  name: `Pulp Fiction`,
  img: `img/pulp-fiction.jpg`
}, {
  name: `No Country for Old Men`,
  img: `img/no-country-for-old-men.jpg`
}, {
  name: `Snatch`,
  img: `img/snatch.jpg`
}, {
  name: `Moonrise Kingdom`,
  img: `img/moonrise-kingdom.jpg`
}, {
  name: `Seven Years in Tibet`,
  img: `img/seven-years-in-tibet.jpg`
}, {
  name: `Midnight Special`,
  img: `img/midnight-special.jpg`
}, {
  name: `War of the Worlds`,
  img: `img/war-of-the-worlds.jpg`
}, {
  name: `Dardjeeling Limited`,
  img: `img/dardjeeling-limited.jpg`
}, {
  name: `Orlando`,
  img: `img/orlando.jpg`
}, {
  name: `Mindhunter`,
  img: `img/mindhunter.jpg`
}, {
  name: `Midnight Special`,
  img: `img/midnight-special.jpg`
}];

it(`renders correctly`, () => {
  const tree = renderer
    .create(<SmallMovieCardsList films={films} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
