import React from 'react';
import { shallow } from 'enzyme';
import SingleBoard from './SingleBoard';

describe('<SingleBoard />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<SingleBoard />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
