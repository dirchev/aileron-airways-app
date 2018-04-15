import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'

import EditableLocation from './EditableLocation'
import LocationInput from './LocationInput'

it('renders without crashing', function () {
  const props = {
    onChange: jest.fn()
  }
  const wrapper = shallow(<EditableLocation {...props}>Text</EditableLocation>)
})

it('renders children', function () {
  const props = {
    onChange: jest.fn()
  }
  const wrapper = shallow(<EditableLocation {...props}>Text</EditableLocation>)
  expect(wrapper.text()).toContain('Text')
})

it('triggers edit mode on click and shows input', function () {
  const props = {
    onChange: jest.fn()
  }
  const wrapper = shallow(<EditableLocation {...props}>Text</EditableLocation>)
  expect(wrapper.find(LocationInput).length).toEqual(0)
  expect(wrapper.state().editMode).toEqual(false)
  wrapper.find('button.button').simulate('click')
  expect(wrapper.state().editMode).toEqual(true)
  expect(wrapper.find(LocationInput).length).toEqual(1)
})

it('does trigger onChange on location input change', function () {
  const props = {
    onChange: jest.fn()
  }
  const wrapper = shallow(<EditableLocation {...props}>Text</EditableLocation>)
  expect(wrapper.find(LocationInput).length).toEqual(0)
  // trigger edit mode
  wrapper.find('button.button').simulate('click')
  expect(wrapper.state().editMode).toEqual(true)
  expect(wrapper.find(LocationInput).length).toEqual(1)
  // trigger input value change
  wrapper.find(LocationInput).simulate('change', 'newValue')
  expect(wrapper.state().value).toEqual('newValue')
  wrapper.find('form').simulate('submit', {preventDefault: jest.fn()})
  expect(wrapper.state().editMode).toEqual(false)
  expect(props.onChange).toBeCalledWith('newValue')
})

it('does reset edit on reset button click', function () {
  const props = {
    onChange: jest.fn()
  }
  const wrapper = shallow(<EditableLocation {...props}>Text</EditableLocation>)
  expect(wrapper.find(LocationInput).length).toEqual(0)
  // trigger edit mode
  wrapper.find('button.button').simulate('click')
  expect(wrapper.state().editMode).toEqual(true)
  wrapper.find('button.button.is-danger').simulate('click')
  expect(wrapper.state().editMode).toEqual(false)
  expect(props.onChange).not.toBeCalled()
})
