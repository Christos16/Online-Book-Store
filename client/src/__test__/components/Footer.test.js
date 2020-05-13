import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';
import { findByTestAttr, testStore } from '../../components/utils/utils';
import Footer from '../../components/views/Footer/Footer';

const enzymeWrapper = shallow(<Footer />);

describe('Should render the component <Footer /> without error', () => {
  test('should render a div tag with [data-test] of Product', () => {
    const component = findByTestAttr(enzymeWrapper, 'Footer');
    expect(component.length).toBe(1);
  });
});
