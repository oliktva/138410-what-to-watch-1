import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withPlayer from './with-player';

Enzyme.configure({adapter: new Adapter()});

describe(`player actions`, () => {
  it(`plays correctly`, () => {
    const MockComponent = () => <div />;
    const MockComponentWrapped = withPlayer(MockComponent);

    const component = shallow(<MockComponentWrapped />);
    const instance = component.instance() as any;
    let isPlaying = instance.state.isPlaying;

    expect(isPlaying).toEqual(false);

    component.props().play();
    isPlaying = instance.state.isPlaying;
    expect(isPlaying).toEqual(true);

    component.props().stop();
    isPlaying = instance.state.isPlaying;
    expect(isPlaying).toEqual(false);
  });

  it(`toggles fullscreen correctly`, () => {
    const MockComponent = () => <div />;
    const MockComponentWrapped = withPlayer(MockComponent);

    const component = shallow(<MockComponentWrapped />);
    const instance = component.instance() as any;
    let isFullscreen = instance.state.isFullscreen;

    expect(isFullscreen).toEqual(false);

    component.props().openFullscreen();
    isFullscreen = instance.state.isFullscreen;
    expect(isFullscreen).toEqual(true);

    component.props().closeFullscreen();
    isFullscreen = instance.state.isFullscreen;
    expect(isFullscreen).toEqual(false);
  });

  it(`sets current time correctly`, () => {
    const MockComponent = () => <div />;
    const MockComponentWrapped = withPlayer(MockComponent);

    const component = shallow(<MockComponentWrapped />);
    const instance = component.instance() as any;
    let currentTime = instance.state.currentTime;

    expect(currentTime).toEqual(0);

    component.props().setCurrentTime(10);
    currentTime = instance.state.currentTime;
    expect(currentTime).toEqual(10);
  });

  it(`sets fulltime correctly`, () => {
    const MockComponent = () => <div />;
    const MockComponentWrapped = withPlayer(MockComponent);

    const component = shallow(<MockComponentWrapped />);
    const instance = component.instance() as any;
    let fulltime = instance.state.fulltime;

    expect(fulltime).toEqual(0);

    component.props().setFulltime(10);
    fulltime = instance.state.fulltime;
    expect(fulltime).toEqual(10);
  });
});
