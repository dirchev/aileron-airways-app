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

it('renders input left icon', function () {
  const props = {
    label: 'Label',
    iconLeft: 'fa fa-search'
  }
  const wrapper = shallow(<Input {...props} />)
  expect(wrapper.find('.field').length).toEqual(1)
  expect(wrapper.find('.control.has-icons-left').length).toEqual(1)
  expect(wrapper.find('.icon.is-small.is-left>.fa.fa-search').length).toEqual(1)
  expect(wrapper.find('input.input').length).toEqual(1)
})

it('renders input right icon', function () {
  const props = {
    label: 'Label',
    iconRight: 'fa fa-search'
  }
  const wrapper = shallow(<Input {...props} />)
  expect(wrapper.find('.field').length).toEqual(1)
  expect(wrapper.find('.control.has-icons-right').length).toEqual(1)
  expect(wrapper.find('.icon.is-small.is-right>.fa.fa-search').length).toEqual(1)
  expect(wrapper.find('input.input').length).toEqual(1)
})

it('triggers onChange', function () {
  const props = {
    label: 'Label',
    value: 'value',
    onChange: jest.fn()
  }
  const wrapper = shallow(<Input {...props} />)
  expect(props.onChange).not.toBeCalled()
  expect(wrapper.find('input').props().value).toEqual('value')
  wrapper.find('input').simulate('change', {target: {value: 'value1'}})
  expect(wrapper.find('input').props().value).toEqual('value')
  expect(props.onChange).toBeCalledWith('value1', {target: {value: 'value1'}})
})

it('updates value on props change', function () {
  const props = {
    label: 'Label',
    value: 'value',
    onChange: jest.fn()
  }
  const wrapper = shallow(<Input {...props} />)
  expect(wrapper.find('input').props().value).toEqual('value')
  wrapper.setProps({value: 'value1'})
  expect(wrapper.find('input').props().value).toEqual('value1')
})
