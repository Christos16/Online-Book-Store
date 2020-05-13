import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';
import { findByTestAttr, testStore } from '../../components/utils/utils';
import UserCard from '../../components/views/CartPage/Sections/UserCard';

const enzymeWrapper = shallow(<UserCard />);

describe('Should render the component <UserCard /> without error', () => {
  test('should render a div tag with [data-test] of Product', () => {
    const component = findByTestAttr(enzymeWrapper, 'UserCard');
    expect(component.length).toBe(1);
  });
});
