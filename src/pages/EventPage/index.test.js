import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'

import { EventPage } from './index'
import { Redirect } from 'react-router-dom'

import EventAttachments from '../../components/EventAttachments'
import EventOptionsButton from '../../components/option-buttons/EventOptionsButton'
import Navigation from '../../components/Navigation'
import EventBox from './EventBox'
import LinkedEventsMap from './LinkedEventsMap'

it('renders without crashing', function () {
  const props = {
    event: {
      Id: '1',
      TimelineId: '1t',
      Title: 'Something',
      Description: 'Description',
      EventDateTime: moment().toISOString(),
      Location: '1.0,2.0'
    },
    changeEventTitle: jest.fn(),
    changeEventDescription: jest.fn(),
    changeEventLocation: jest.fn(),
    deleteEvent: jest.fn(),
  }
  const wrapper = shallow(<EventPage {...props} />)
})

it('renders redirect if event is not found', function () {
  const props = {
    event: null,
    changeEventTitle: jest.fn(),
    changeEventDescription: jest.fn(),
    changeEventLocation: jest.fn(),
    deleteEvent: jest.fn(),
  }
  const wrapper = shallow(<EventPage {...props} />)
  expect(wrapper.find(Redirect).length).toEqual(1)
})

it('render additional components', function () {
  const props = {
    event: {
      Id: '1',
      TimelineId: '1t',
      Title: 'Something',
      Description: 'Description',
      EventDateTime: moment().toISOString(),
      Location: '1.0,2.0'
    },
    changeEventTitle: jest.fn(),
    changeEventDescription: jest.fn(),
    changeEventLocation: jest.fn(),
    deleteEvent: jest.fn(),
  }
  const wrapper = shallow(<EventPage {...props} />)
  expect(wrapper.find(EventAttachments).length).toEqual(1)
  expect(wrapper.find(EventAttachments).props()).toEqual({
    event: props.event
  })

  expect(wrapper.find(LinkedEventsMap).length).toEqual(1)
  expect(wrapper.find(LinkedEventsMap).props()).toEqual({
    event: props.event
  })

  expect(wrapper.find(EventBox).length).toEqual(1)
  expect(wrapper.find(EventBox).props().event).toEqual(props.event)
  expect(wrapper.find(EventBox).props().handleTitleChange).toBeDefined()
  expect(wrapper.find(EventBox).props().handleDescriptionChange).toBeDefined()
  expect(wrapper.find(EventBox).props().handleLocationChange).toBeDefined()

  expect(wrapper.find(EventOptionsButton).props().event).toEqual(props.event)
  expect(wrapper.find(EventOptionsButton).props().deleteEvent).toBeDefined()
})
