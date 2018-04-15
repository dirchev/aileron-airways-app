import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'

import TimelineEvents from './TimelineEvents'
import Input from '../../components/inputs/Input'
import EventsList from '../../components/EventsList'
import EventsTimeline from '../../components/EventsTimeline'
import EventsCalendar from '../../components/EventsCalendar'

it('renders without crashing', function () {
  const props = {
    timeline: {
      Id: '1',
      Title: 'Title',
      events: [
        {
          Id: '1',
          TimelineId: '1t',
          Title: 'Something',
          Description: 'Description',
          EventDateTime: moment().toISOString(),
          Location: '1.0,2.0'
        },
        {
          Id: '2',
          TimelineId: '1t',
          Title: 'Something2',
          Description: 'Description2',
          EventDateTime: moment().toISOString(),
          Location: '1.0,2.0'
        },
      ]
    }
  }
  const wrapper = shallow(<TimelineEvents {...props} />)
})

it('filters events on input value change', function () {
  const props = {
    timeline: {
      Id: '1',
      Title: 'Title',
      events: [
        {
          Id: '1',
          TimelineId: '1t',
          Title: 'Something',
          Description: 'Description',
          EventDateTime: moment().toISOString(),
          Location: '1.0,2.0'
        },
        {
          Id: '2',
          TimelineId: '1t',
          Title: 'Something2',
          Description: 'Description2',
          EventDateTime: moment().toISOString(),
          Location: '1.0,2.0'
        },
      ]
    }
  }
  const wrapper = shallow(<TimelineEvents {...props} />)
  expect(wrapper.state().events.length).toEqual(2)
  wrapper.find(Input).simulate('change', '2')
  expect(wrapper.state().events.length).toEqual(1)
  expect(wrapper.state().events[0].Id).toEqual('2')
})

it('handles view change', function () {
  const props = {
    timeline: {
      Id: '1',
      Title: 'Title',
      events: [
        {
          Id: '1',
          TimelineId: '1t',
          Title: 'Something',
          Description: 'Description',
          EventDateTime: moment().toISOString(),
          Location: '1.0,2.0'
        },
        {
          Id: '2',
          TimelineId: '1t',
          Title: 'Something2',
          Description: 'Description2',
          EventDateTime: moment().toISOString(),
          Location: '1.0,2.0'
        },
      ]
    }
  }
  const wrapper = shallow(<TimelineEvents {...props} />)

  expect(wrapper.state().viewMode).toEqual('list')
  expect(wrapper.find(EventsList).length).toEqual(1)
  expect(wrapper.find(EventsList).props()).toEqual({
    events: props.timeline.events
  })

  wrapper.find('button').at(1).simulate('click', {preventDefault: jest.fn()})
  expect(wrapper.state().viewMode).toEqual('calendar')
  expect(wrapper.find(EventsCalendar).length).toEqual(1)
  expect(wrapper.find(EventsCalendar).props()).toEqual({
    events: props.timeline.events
  })

  wrapper.find('button').at(2).simulate('click', {preventDefault: jest.fn()})
  expect(wrapper.state().viewMode).toEqual('timeline')
  expect(wrapper.find(EventsTimeline).length).toEqual(1)
  expect(wrapper.find(EventsTimeline).props()).toEqual({
    events: props.timeline.events
  })

  wrapper.find('button').at(0).simulate('click', {preventDefault: jest.fn()})
  expect(wrapper.state().viewMode).toEqual('list')
  expect(wrapper.find(EventsList).length).toEqual(1)
  expect(wrapper.find(EventsList).props()).toEqual({
    events: props.timeline.events
  })
})
