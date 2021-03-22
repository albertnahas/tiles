import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GameBoard from './GameBoard';

Enzyme.configure({ adapter: new Adapter() });

describe('<GameBoard />', () => {
  let component;

  beforeEach(() => {
    component = Enzyme.shallow(<GameBoard />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
