import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SingleBoard from './SingleBoard';


Enzyme.configure({ adapter: new Adapter() });
describe('<SingleBoard />', () => {
  let component;

  beforeEach(() => {
    component = Enzyme.shallow(<SingleBoard />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
