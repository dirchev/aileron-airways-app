import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'

import EditableTextArea from './EditableTextArea'
import Textarea from './Textarea'

it('renders without crashing', function () {
  const props = {
    onChange: jest.fn(),
    validator: () => {}
  }
  const wrapper = shallow(<EditableTextArea {...props}>Text</EditableTextArea>)
})

it('renders children', function () {
  const props = {
    onChange: jest.fn(),
    validator: () => {}
  }
  const wrapper = shallow(<EditableTextArea {...props}>Text</EditableTextArea>)
  expect(wrapper.text()).toContain('Text')
})

it('triggers edit mode on click and shows Texarea', function () {
  const props = {
    onChange: jest.fn(),
    validator: () => {}
  }
  const wrapper = shallow(<EditableTextArea {...props}>Text</EditableTextArea>)
  expect(wrapper.find(Textarea).length).toEqual(0)
  expect(wrapper.state().editMode).toEqual(false)
  wrapper.find('.editable-text').simulate('click')
  expect(wrapper.state().editMode).toEqual(true)
  expect(wrapper.find(Textarea).length).toEqual(1)
})

it('does trigger onChange on form submit', function () {
  const props = {
    onChange: jest.fn(),
    validator: () => {}
  }
  const wrapper = shallow(<EditableTextArea {...props}>Text</EditableTextArea>)
  expect(wrapper.find(Textarea).length).toEqual(0)
  // trigger edit mode
  wrapper.find('.editable-text').simulate('click')
  expect(wrapper.state().editMode).toEqual(true)
  expect(wrapper.find(Textarea).length).toEqual(1)
  // trigger textarea value change
  wrapper.find(Textarea).simulate('change', 'newValue')
  expect(wrapper.state().value).toEqual('newValue')
  // submit edit form
  wrapper.find('form').simulate('submit', {preventDefault: jest.fn()})
  expect(wrapper.state().value).toEqual('newValue')
  expect(wrapper.state().editMode).toEqual(false)
  expect(props.onChange).toBeCalledWith('newValue')
})

it('sets value to the textarea', function () {
  const props = {
    onChange: jest.fn(),
    defaultValue: 'Some value',
    validator: () => {}
  }
  const wrapper = shallow(<EditableTextArea {...props}>Text</EditableTextArea>)
  expect(wrapper.find(Textarea).length).toEqual(0)
  wrapper.find('.editable-text').simulate('click')
  expect(wrapper.state().editMode).toEqual(true)
  expect(wrapper.state().value).toEqual('Some value')
  expect(wrapper.find(Textarea).length).toEqual(1)
  expect(wrapper.find(Textarea).prop('value')).toEqual('Some value')
})

it('does reset on cancel button click', function () {
  const props = {
    onChange: jest.fn(),
    defaultValue: 'Some value',
    validator: () => {}
  }
  const wrapper = shallow(<EditableTextArea {...props}>Text</EditableTextArea>)
  expect(wrapper.find(Textarea).length).toEqual(0)
  wrapper.find('.editable-text').simulate('click')
  expect(wrapper.state().editMode).toEqual(true)
  wrapper.find('.button.is-danger').simulate('click')
  expect(wrapper.state().editMode).toEqual(false)
})
