import React from 'react'
import moment from 'moment'
import { shallow } from 'enzyme'

import { CreateEventModal } from './CreateEventModal'

import Input from '../inputs/Input'
import DatetimeInput from '../inputs/DatetimeInput'
import Textarea from '../inputs/Textarea'
import LocationInput from '../inputs/LocationInput'

it('renders without crashing', function () {
  const props = {
    onClose: jest.fn(),
    createEvent: jest.fn()
  }
  const wrapper = shallow(<CreateEventModal {...props} />)
})

it('sets fields properly', function () {
  const props = {
    onClose: jest.fn(),
    createEvent: jest.fn()
  }
  const wrapper = shallow(<CreateEventModal {...props} />)
  expect(wrapper.state()).toEqual({
    title: '',
    description: '',
    eventDateTime: '',
    location: ''
  })
  var date = moment().toISOString()
  wrapper.find(Input).simulate('change', 'Title')
  wrapper.find(Textarea).simulate('change', 'Description')
  wrapper.find(DatetimeInput).simulate('change', date)
  wrapper.find(LocationInput).simulate('change', 'new location')
  expect(wrapper.state()).toEqual({
    title: 'Title',
    description: 'Description',
    eventDateTime: date,
    location: 'new location'
  })
})

it('sets fields properly', function () {
  const props = {
    onClose: jest.fn(),
    createEvent: jest.fn()
  }
  const wrapper = shallow(<CreateEventModal {...props} />)
  var date = moment().toISOString()
  expect(wrapper.setState({
    title: 'Title',
    description: 'Description',
    eventDateTime: date,
    location: 'new location'
  }))
  wrapper.find('form').simulate('submit', {preventDefault: jest.fn()})
  expect(props.createEvent).toBeCalledWith({
    Title: 'Title',
    Description: 'Description',
    EventDateTime: date,
    Location: 'new location'
  })
})

it('closes modal on cancel', function () {
  const props = {
    onClose: jest.fn(),
    createEvent: jest.fn()
  }
  const wrapper = shallow(<CreateEventModal {...props} />)
  wrapper.find('button').at(0).simulate('click', {preventDefault: jest.fn()})
  expect(props.onClose).toBeCalled()
  expect(props.createEvent).not.toBeCalled()
})
