import React from 'react'
import { shallow } from 'enzyme'

import Input from './Input'

it('renders without crashing', function () {
  const props = {}
  const wrapper = shallow(<Input {...props} />)
})

it('renders input without label', function () {
  const props = {}
  const wrapper = shallow(<Input {...props} />)
  expect(wrapper.find('.field').length).toEqual(0)
  expect(wrapper.find('.control').length).toEqual(1)
  expect(wrapper.find('input.input').length).toEqual(1)
})

it('renders input with label', function () {
  const props = {
    label: 'Label'
  }
  const wrapper = shallow(<Input {...props} />)
  expect(wrapper.find('.field').length).toEqual(1)
  expect(wrapper.find('.control').length).toEqual(1)
  expect(wrapper.find('input.input').length).toEqual(1)
})
