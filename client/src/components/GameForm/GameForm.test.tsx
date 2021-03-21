import React from 'react';
import { shallow } from 'enzyme';
import GameForm from './GameForm';

describe('<GameForm />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<GameForm />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
