import React from 'react'
import { shallow } from 'enzyme'
import { EventOptionsButton } from './index'

import sweetalert2 from 'sweetalert2'
jest.mock('sweetalert2')

it('renders without crashing', function () {
  const props = {
    event: {
      Id: '1',
      TimelineId: '1',
      Title: 'Some title'
    },
    openModal: jest.fn(),
    deleteEvent: jest.fn()
  }
  const wrapper = shallow(<EventOptionsButton {...props} />)
})

it('shows 1 button when closed', function () {
  const props = {
    event: {
      Id: '1',
      TimelineId: '1',
      Title: 'Some title'
    },
    openModal: jest.fn(),
    deleteEvent: jest.fn()
  }
  const wrapper = shallow(<EventOptionsButton {...props} />)
  expect(wrapper.find('button').length).toEqual(1)
})

it('opens and closes on click', function () {
  const props = {
    event: {
      Id: '1',
      TimelineId: '1',
      Title: 'Some title'
    },
    openModal: jest.fn(),
    deleteEvent: jest.fn()
  }
  const wrapper = shallow(<EventOptionsButton {...props} />)
  expect(wrapper.state().opened).toEqual(false)
  expect(wrapper.find('button').length).toEqual(1)
  wrapper.find('button').simulate('click', {preventDefault: jest.fn()})
  expect(wrapper.state().opened).toEqual(true)
  wrapper.find('button.is-circle').simulate('click', {preventDefault: jest.fn()})
  expect(wrapper.state().opened).toEqual(false)
})

it('shows 3 buttons when opened', function () {
  const props = {
    event: {
      Id: '1',
      TimelineId: '1',
      Title: 'Some title'
    },
    openModal: jest.fn(),
    deleteEvent: jest.fn()
  }
  const wrapper = shallow(<EventOptionsButton {...props} />)
  wrapper.setState({opened: true})
  expect(wrapper.find('.items>button').length).toEqual(3)
  expect(wrapper.find('.items>button').at(0).text()).toEqual('Attach a file')
  expect(wrapper.find('.items>button').at(1).text()).toEqual('Link event')
  expect(wrapper.find('.items>button').at(2).text()).toEqual('Delete')
})

it('opens attach file modal', function () {
  const props = {
    event: {
      Id: '1',
      TimelineId: '1',
      Title: 'Some title'
    },
    openModal: jest.fn(),
    deleteEvent: jest.fn(),
  }
  const wrapper = shallow(<EventOptionsButton {...props} />)
  wrapper.setState({opened: true})
  expect(wrapper.find('.items>button').at(0).text()).toEqual('Attach a file')
  wrapper.find('.items>button').at(0).simulate('click', {preventDefault: jest.fn()})
  expect(props.openModal).toBeCalledWith('createAttachment', {
    EventId: '1'
  })
})

it('opens link event modal', function () {
  const props = {
    event: {
      Id: '1',
      TimelineId: 't1',
      Title: 'Some title'
    },
    openModal: jest.fn(),
    deleteEvent: jest.fn(),
  }
  const wrapper = shallow(<EventOptionsButton {...props} />)
  wrapper.setState({opened: true})
  expect(wrapper.find('.items>button').at(1).text()).toEqual('Link event')
  wrapper.find('.items>button').at(1).simulate('click', {preventDefault: jest.fn()})
  expect(props.openModal).toBeCalledWith('linkEvent', {
    TimelineId: 't1',
    EventId: '1'
  })
})

it('confirms and deletes', async function () {
  const p = Promise.resolve('success')
  const props = {
    event: {
      Id: '1',
      TimelineId: 't1',
      Title: 'Some title'
    },
    openModal: jest.fn(),
    deleteEvent: jest.fn(() => p)
  }
  sweetalert2.mockImplementation(() => Promise.resolve({value: true}))
  const wrapper = shallow(<EventOptionsButton {...props} />)
  wrapper.setState({opened: true})
  expect(wrapper.find('.items>button').at(2).text()).toEqual('Delete')
  wrapper.find('.items>button').at(2).simulate('click', {preventDefault: jest.fn()})
  expect(sweetalert2).toBeCalled()
  await p
  expect(props.deleteEvent).toBeCalled()
})

it('rejects and does not delete', async function () {
  const p = Promise.resolve('success')
  const props = {
    event: {
      Id: '1',
      TimelineId: 't1',
      Title: 'Some title'
    },
    openModal: jest.fn(),
    deleteEvent: jest.fn(() => p)
  }
  sweetalert2.mockImplementation(() => Promise.resolve({value: false}))
  const wrapper = shallow(<EventOptionsButton {...props} />)
  wrapper.setState({opened: true})
  expect(wrapper.find('.items>button').at(2).text()).toEqual('Delete')
  wrapper.find('.items>button').at(2).simulate('click', {preventDefault: jest.fn()})
  expect(sweetalert2).toBeCalled()
  await p
  expect(props.deleteEvent).not.toBeCalled()
})
