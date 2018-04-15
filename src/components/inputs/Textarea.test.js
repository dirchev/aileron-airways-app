import React from 'react'
import { shallow } from 'enzyme'

import Textarea from './Textarea'

it('renders without crashing', function () {
  const props = {}
  const wrapper = shallow(<Textarea {...props} />)
})

it('renders textarea without label', function () {
  const props = {}
  const wrapper = shallow(<Textarea {...props} />)
  expect(wrapper.find('.field').length).toEqual(1)
  expect(wrapper.find('.control').length).toEqual(1)
  expect(wrapper.find('textarea.textarea').length).toEqual(1)
})

it('renders textarea with label', function () {
  const props = {
    label: 'Label'
  }
  const wrapper = shallow(<Textarea {...props} />)
  expect(wrapper.find('.field').length).toEqual(1)
  expect(wrapper.find('.control').length).toEqual(1)
  expect(wrapper.find('textarea.textarea').length).toEqual(1)
})

it('triggers onChange', function () {
  const props = {
    label: 'Label',
    value: 'value',
    onChange: jest.fn()
  }
  const wrapper = shallow(<Textarea {...props} />)
  expect(props.onChange).not.toBeCalled()
  expect(wrapper.find('textarea').props().value).toEqual('value')
  wrapper.find('textarea').simulate('change', {target: {value: 'value1'}})
  expect(wrapper.find('textarea').props().value).toEqual('value')
  expect(props.onChange).toBeCalledWith('value1', {target: {value: 'value1'}})
})

it('updates value on props change', function () {
  const props = {
    label: 'Label',
    value: 'value',
    onChange: jest.fn()
  }
  const wrapper = shallow(<Textarea {...props} />)
  expect(wrapper.find('textarea').props().value).toEqual('value')
  wrapper.setProps({value: 'value1'})
  expect(wrapper.find('textarea').props().value).toEqual('value1')
})
