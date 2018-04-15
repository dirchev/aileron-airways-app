import React from 'react'
import { shallow } from 'enzyme'
import TimelineOptionsButton from './index'

import sweetalert2 from 'sweetalert2'
jest.mock('sweetalert2')

it('renders without crashing', function () {
  const props = {
    createEvent: jest.fn(),
    deleteTimeline: jest.fn()
  }
  const wrapper = shallow(<TimelineOptionsButton {...props} />)
})

it('shows 1 button when closed', function () {
  const props = {
    createEvent: jest.fn(),
    deleteTimeline: jest.fn()
  }
  const wrapper = shallow(<TimelineOptionsButton {...props} />)
  expect(wrapper.find('button').length).toEqual(1)
})

it('opens and closes on click', function () {
  const props = {
    createEvent: jest.fn(),
    deleteTimeline: jest.fn()
  }
  const wrapper = shallow(<TimelineOptionsButton {...props} />)
  expect(wrapper.state().opened).toEqual(false)
  expect(wrapper.find('button').length).toEqual(1)
  wrapper.find('button').simulate('click', {preventDefault: jest.fn()})
  expect(wrapper.state().opened).toEqual(true)
  wrapper.find('button.is-circle').simulate('click', {preventDefault: jest.fn()})
  expect(wrapper.state().opened).toEqual(false)
})

it('shows 2 buttons when opened', function () {
  const props = {
    createEvent: jest.fn(),
    deleteTimeline: jest.fn()
  }
  const wrapper = shallow(<TimelineOptionsButton {...props} />)
  wrapper.setState({opened: true})
  expect(wrapper.find('.items>button').length).toEqual(2)
  expect(wrapper.find('.items>button').at(0).text()).toEqual('Create Event')
  expect(wrapper.find('.items>button').at(1).text()).toEqual('Delete')
})

it('triggers create event', function () {
  const props = {
    createEvent: jest.fn(),
    deleteTimeline: jest.fn()
  }
  const wrapper = shallow(<TimelineOptionsButton {...props} />)
  wrapper.setState({opened: true})
  expect(wrapper.find('.items>button').at(0).text()).toEqual('Create Event')
  wrapper.find('.items>button').at(0).simulate('click', {preventDefault: jest.fn()})
  expect(props.createEvent).toBeCalled()
})

it('confirms and deletes', async function () {
  const p = Promise.resolve('success')
  const props = {
    createEvent: jest.fn(),
    deleteTimeline: jest.fn(() => p)
  }
  const wrapper = shallow(<TimelineOptionsButton {...props} />)
  sweetalert2.mockImplementation(() => Promise.resolve({value: true}))
  wrapper.setState({opened: true})
  expect(wrapper.find('.items>button').at(1).text()).toEqual('Delete')
  wrapper.find('.items>button').at(1).simulate('click', {preventDefault: jest.fn()})
  expect(sweetalert2).toBeCalled()
  await p
  expect(props.deleteTimeline).toBeCalled()
})

it('rejects and does not delete', async function () {
  const p = Promise.resolve('success')
  const props = {
    createEvent: jest.fn(),
    deleteTimeline: jest.fn(() => p)
  }
  const wrapper = shallow(<TimelineOptionsButton {...props} />)
  sweetalert2.mockImplementation(() => Promise.resolve({value: false}))
  wrapper.setState({opened: true})
  expect(wrapper.find('.items>button').at(1).text()).toEqual('Delete')
  wrapper.find('.items>button').at(1).simulate('click', {preventDefault: jest.fn()})
  expect(sweetalert2).toBeCalled()
  await p
  expect(props.deleteTimeline).not.toBeCalled()
})
