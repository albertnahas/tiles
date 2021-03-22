import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GameForm from './GameForm';

Enzyme.configure({ adapter: new Adapter() });
describe('<GameForm />', () => {
  let component;

  beforeEach(() => {
    component = Enzyme.shallow(<GameForm />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
