import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';
import { findByTestAttr, testStore } from '../../components/utils/utils';
import InfoTab from '../../components/views/DetailProductPage/Sections/InfoTab';

const enzymeWrapper = shallow(<InfoTab />);

describe('Should render the component <InfoTab /> without error', () => {
  test('should render a div tag with [data-test] of InfoTab', () => {
    const component = findByTestAttr(enzymeWrapper, 'InfoTab');
    expect(component.length).toBe(1);
  });
});
