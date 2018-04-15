import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'

import { Redirect } from 'react-router-dom'
import Navigation from '../../components/Navigation'
import TimelineHeading from './TimelineHeading'
import TimelineEvents from './TimelineEvents'
import TimelineOptionsButton from '../../components/option-buttons/TimelineOptionsButton'

import { TimelinePage } from './index'

it('renders without crashing', function () {
  const props = {
    timeline: {
      Id: '1',
      Title: 'Title',
      CreationTimeStamp: moment().toISOString(),
      events: []
    },
    changeTimelineTitle: jest.fn(),
    deleteTimeline: jest.fn(),
    fetchEvents: jest.fn(),
    createEvent: jest.fn(),
  }
  const wrapper = shallow(<TimelinePage {...props} />)
})

it('fetches events on mount', function () {
  const props = {
    changeTimelineTitle: jest.fn(),
    deleteTimeline: jest.fn(),
    fetchEvents: jest.fn(),
    createEvent: jest.fn(),
  }
  const wrapper = shallow(<TimelinePage {...props} />)
  expect(props.fetchEvents).toBeCalled()
})

it('renders redirect if timeline does not exist', function () {
  const props = {
    changeTimelineTitle: jest.fn(),
    deleteTimeline: jest.fn(),
    fetchEvents: jest.fn(),
    createEvent: jest.fn(),
  }
  const wrapper = shallow(<TimelinePage {...props} />)
  expect(wrapper.find(Redirect).length).toEqual(1)
})

it('renders additional components', function () {
  const props = {
    timeline: {
      Id: '1',
      Title: 'Title',
      CreationTimeStamp: moment().toISOString(),
      events: []
    },
    changeTimelineTitle: jest.fn(),
    deleteTimeline: jest.fn(),
    fetchEvents: jest.fn(),
    createEvent: jest.fn(),
  }

  const wrapper = shallow(<TimelinePage {...props} />)
  expect(wrapper.find(Navigation).length).toEqual(1)
  expect(wrapper.find(Navigation).prop('actions')).toBeDefined()

  expect(wrapper.find(TimelineHeading).length).toEqual(1)
  expect(wrapper.find(TimelineHeading).prop('timeline')).toEqual(props.timeline)
  expect(wrapper.find(TimelineHeading).prop('onTitleChange')).toBeDefined()

  expect(wrapper.find(TimelineEvents).length).toEqual(1)
  expect(wrapper.find(TimelineEvents).prop('timeline')).toEqual(props.timeline)

  expect(wrapper.find(TimelineOptionsButton).length).toEqual(1)
  expect(wrapper.find(TimelineOptionsButton).prop('deleteTimeline')).toEqual(props.deleteTimeline)
  expect(wrapper.find(TimelineOptionsButton).prop('createEvent')).toEqual(props.createEvent)
})
