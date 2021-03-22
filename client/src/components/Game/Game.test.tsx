import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Game from './Game';

Enzyme.configure({ adapter: new Adapter() });

describe('<Game />', () => {
  let component;

  beforeEach(() => {
    component = Enzyme.shallow(<Game />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
