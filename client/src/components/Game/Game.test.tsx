import React from 'react';
import { shallow } from 'enzyme';
import Game from './Game';

describe('<Game />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Game />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
