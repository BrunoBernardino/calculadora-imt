import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import expect from 'expect';
import enzymify from 'expect-enzyme';

import TextInput from './index';

expect.extend(enzymify());

describe('TextInput', () => {
  it('renders the text input without errors', () => {
    const wrapper = mount(
      <TextInput label="Name" name="name" value="Bruno" onChange={() => {}} />,
    );
    expect(wrapper.find('input').props().value).toBe('Bruno');
    expect(wrapper.find('label').text()).toBe('Name');
  });

  it('renders the input as expected', () => {
    const tree = renderer
      .create(<TextInput label="Name" name="name" value="Bruno" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
