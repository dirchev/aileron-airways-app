import React from 'react'
import moment from 'moment'
import { shallow } from 'enzyme'

import { CreateTimelineModal } from './CreateTimelineModal'

import Input from '../inputs/Input'

it('renders without crashing', function () {
  const props = {
    onClose: jest.fn(),
    createTimeline: jest.fn()
  }
  const wrapper = shallow(<CreateTimelineModal {...props} />)
})

it('sets fields properly', function () {
  const props = {
    onClose: jest.fn(),
    createTimeline: jest.fn()
  }
  const wrapper = shallow(<CreateTimelineModal {...props} />)
  expect(wrapper.state()).toEqual({
    title: '',
  })
  var date = moment().toISOString()
  wrapper.find(Input).simulate('change', 'Title')
  expect(wrapper.state()).toEqual({
    title: 'Title',
  })
})

it('sets fields properly', function () {
  const props = {
    onClose: jest.fn(),
    createTimeline: jest.fn()
  }
  const wrapper = shallow(<CreateTimelineModal {...props} />)
  var date = moment().toISOString()
  expect(wrapper.setState({
    title: 'Title',
  }))
  wrapper.find('form').simulate('submit', {preventDefault: jest.fn()})
  expect(props.createTimeline).toBeCalledWith({
    Title: 'Title',
  })
})

it('closes modal on cancel', function () {
  const props = {
    onClose: jest.fn(),
    createTimeline: jest.fn()
  }
  const wrapper = shallow(<CreateTimelineModal {...props} />)
  wrapper.find('button').at(0).simulate('click', {preventDefault: jest.fn()})
  expect(props.onClose).toBeCalled()
  expect(props.createTimeline).not.toBeCalled()
})
