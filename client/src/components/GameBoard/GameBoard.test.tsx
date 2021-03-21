import React from 'react';
import { shallow } from 'enzyme';
import GameBoard from './GameBoard';

describe('<GameBoard />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<GameBoard />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
