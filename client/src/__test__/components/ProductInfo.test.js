import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';
import { findByTestAttr, testStore } from '../../components/utils/utils';
import ProductInfo from '../../components/views/DetailProductPage/Sections/ProductInfo';

const enzymeWrapper = shallow(<ProductInfo />);

describe('Should render the component <ProductInfo /> without error', () => {
  test('should render a div tag with [data-test] of ProductInfo', () => {
    const component = findByTestAttr(enzymeWrapper, 'ProductInfo');
    expect(component.length).toBe(1);
  });
});
