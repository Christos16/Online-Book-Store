import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';
import { findByTestAttr, testStore } from '../../components/utils/utils';
import ProductImage from '../../components/views/DetailProductPage/Sections/ProductImage';

const enzymeWrapper = shallow(<ProductImage />);

describe('Should render the component <ProductImage /> without error', () => {
  test('should render a div tag with [data-test] of Product', () => {
    const component = findByTestAttr(enzymeWrapper, 'ProductImage');
    expect(component.length).toBe(1);
  });
});
