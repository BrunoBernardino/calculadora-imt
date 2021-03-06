import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import expect from 'expect';
import enzymify from 'expect-enzyme';

import Header from './Header';

expect.extend(enzymify());

describe('Header', () => {
  it('renders the Header without errors', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('nav').length).toEqual(0);
  });

  it('renders the Header as expected', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
