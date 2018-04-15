import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'

import sweetalert2 from 'sweetalert2'
jest.mock('sweetalert2')

import { LinkedEventsMap } from './LinkedEventsMap'

it('renders without crashing', function () {
  const props = {
    event: {
      Id: '1',
      TimelineEventId: '1t',
      Title: 'Something',
      Description: 'Description',
      EventDateTime: moment().toISOString(),
      Location: '1.0,2.0'
    },
    items: [
      {
        Id: '1',
        TimelineEventId: '1t',
        Title: 'Something',
        Description: 'Description',
        EventDateTime: moment().toISOString(),
        Location: '1.0,2.0'
      },
      {
        Id: '2',
        TimelineEventId: '1t',
        Title: 'Something 2',
        Description: 'Description 2',
        EventDateTime: moment().toISOString(),
        Location: '1.0,2.0'
      },
    ],
    getLinkedEvents: jest.fn(),
    unlinkEvent: jest.fn()
  }
  const wrapper = shallow(<LinkedEventsMap {...props} />)
})

it('renders a link for the current event + each linked event', function () {
  const props = {
    event: {
      Id: '1',
      TimelineEventId: '1t',
      Title: 'Something',
      Description: 'Description',
      EventDateTime: moment().toISOString(),
      Location: '1.0,2.0'
    },
    items: [
      {
        Id: '1',
        TimelineEventId: '1t',
        Title: 'Something',
        Description: 'Description',
        EventDateTime: moment().toISOString(),
        Location: '1.0,2.0'
      },
      {
        Id: '2',
        TimelineEventId: '1t',
        Title: 'Something 2',
        Description: 'Description 2',
        EventDateTime: moment().toISOString(),
        Location: '1.0,2.0'
      },
    ],
    getLinkedEvents: jest.fn(),
    unlinkEvent: jest.fn()
  }
  const wrapper = shallow(<LinkedEventsMap {...props} />)
  expect(props.getLinkedEvents).toBeCalled()
  expect(wrapper.find('.timeline-item').length).toEqual(2)
  expect(wrapper.find('.timeline-item').at(0).find('Link').prop('to')).toEqual('/event/1')
  expect(wrapper.find('.timeline-item').at(1).find('Link').prop('to')).toEqual('/event/2')
})

it('opens edit mode and shows delete links', function () {
  const props = {
    event: {
      Id: '1',
      TimelineEventId: '1t',
      Title: 'Something',
      Description: 'Description',
      EventDateTime: moment().toISOString(),
      Location: '1.0,2.0'
    },
    items: [
      {
        Id: '1',
        TimelineEventId: '1t',
        Title: 'Something',
        Description: 'Description',
        EventDateTime: moment().toISOString(),
        Location: '1.0,2.0'
      },
      {
        Id: '2',
        TimelineEventId: '1t',
        Title: 'Something 2',
        Description: 'Description 2',
        EventDateTime: moment().toISOString(),
        Location: '1.0,2.0'
      },
    ],
    getLinkedEvents: jest.fn(),
    unlinkEvent: jest.fn()
  }
  const wrapper = shallow(<LinkedEventsMap {...props} />)
  expect(wrapper.find('button').length).toEqual(1)
  expect(wrapper.state().editMode).toEqual(false)
  wrapper.find('button').simulate('click', {preventDefault: jest.fn()})
  expect(wrapper.state().editMode).toEqual(true)
  expect(wrapper.find('a.timeline-marker').length).toEqual(1)
})

it('confirms and unlinks event', async function () {
  const p = Promise.resolve('success')
  const props = {
    event: {
      Id: '1',
      TimelineEventId: '1t',
      Title: 'Something',
      Description: 'Description',
      EventDateTime: moment().toISOString(),
      Location: '1.0,2.0'
    },
    items: [
      {
        Id: '1',
        TimelineEventId: '1t',
        Title: 'Something',
        Description: 'Description',
        EventDateTime: moment().toISOString(),
        Location: '1.0,2.0'
      },
      {
        Id: '2',
        TimelineEventId: '1t',
        Title: 'Something 2',
        Description: 'Description 2',
        EventDateTime: moment().toISOString(),
        Location: '1.0,2.0'
      },
    ],
    getLinkedEvents: jest.fn(),
    unlinkEvent: jest.fn(() => p)
  }
  sweetalert2.mockImplementation(() => Promise.resolve({value: true}))
  const wrapper = shallow(<LinkedEventsMap {...props} />)
  wrapper.setState({editMode: true})
  wrapper.find('a.timeline-marker').simulate('click', {preventDefault: jest.fn()})
  await p
  expect(props.unlinkEvent).toBeCalledWith(props.items[1].Id)
})

it('rejects and does not unlink event', async function () {
  const p = Promise.resolve('success')
  const props = {
    event: {
      Id: '1',
      TimelineEventId: '1t',
      Title: 'Something',
      Description: 'Description',
      EventDateTime: moment().toISOString(),
      Location: '1.0,2.0'
    },
    items: [
      {
        Id: '1',
        TimelineEventId: '1t',
        Title: 'Something',
        Description: 'Description',
        EventDateTime: moment().toISOString(),
        Location: '1.0,2.0'
      },
      {
        Id: '2',
        TimelineEventId: '1t',
        Title: 'Something 2',
        Description: 'Description 2',
        EventDateTime: moment().toISOString(),
        Location: '1.0,2.0'
      },
    ],
    getLinkedEvents: jest.fn(),
    unlinkEvent: jest.fn(() => p)
  }
  sweetalert2.mockImplementation(() => Promise.resolve({value: false}))
  const wrapper = shallow(<LinkedEventsMap {...props} />)
  wrapper.setState({editMode: true})
  wrapper.find('a.timeline-marker').simulate('click', {preventDefault: jest.fn()})
  await p
  expect(props.unlinkEvent).not.toBeCalledWith(props.items[1].Id)
})
