import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withPlayer from './with-player';

Enzyme.configure({adapter: new Adapter()});

describe(`player actions`, () => {
  it(`plays correctly`, () => {
    const MockComponent = () => <div />;
    const MockComponentWrapped = withPlayer(MockComponent);

    const card = shallow(<MockComponentWrapped />);
    let isPlaying = card.state().isPlaying;

    expect(isPlaying).toEqual(false);

    card.props().play();
    isPlaying = card.state().isPlaying;
    expect(isPlaying).toEqual(true);

    card.props().stop();
    isPlaying = card.state().isPlaying;
    expect(isPlaying).toEqual(false);
  });

  it(`toggles fullscreen correctly`, () => {
    const MockComponent = () => <div />;
    const MockComponentWrapped = withPlayer(MockComponent);

    const card = shallow(<MockComponentWrapped />);
    let isFullscreen = card.state().isFullscreen;

    expect(isFullscreen).toEqual(false);

    card.props().openFullscreen();
    isFullscreen = card.state().isFullscreen;
    expect(isFullscreen).toEqual(true);

    card.props().closeFullscreen();
    isFullscreen = card.state().isFullscreen;
    expect(isFullscreen).toEqual(false);
  });

  it(`sets current time correctly`, () => {
    const MockComponent = () => <div />;
    const MockComponentWrapped = withPlayer(MockComponent);

    const card = shallow(<MockComponentWrapped />);
    let currentTime = card.state().currentTime;

    expect(currentTime).toEqual(0);

    card.props().setCurrentTime(10);
    currentTime = card.state().currentTime;
    expect(currentTime).toEqual(10);
  });

  it(`sets fulltime correctly`, () => {
    const MockComponent = () => <div />;
    const MockComponentWrapped = withPlayer(MockComponent);

    const card = shallow(<MockComponentWrapped />);
    let fulltime = card.state().fulltime;

    expect(fulltime).toEqual(0);

    card.props().setFulltime(10);
    fulltime = card.state().fulltime;
    expect(fulltime).toEqual(10);
  });
});
