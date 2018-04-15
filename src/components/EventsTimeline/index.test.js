import React from 'react'
import moment from 'moment'
import { shallow } from 'enzyme'

import EventsCalendar from './index.js'
import { Link } from 'react-router-dom'

it('does not crash on render', () => {
  const props = {
    events: []
  }
  const wrapper = shallow(<EventsCalendar {...props} />)
})

it('renders each event in .timeline-item element', () => {
  const props = {
    events: [
      {
        Id: 'Event1',
        Title: 'Event Title',
        Description: 'Event Description',
        EventDateTime: moment().toISOString()
      },
      {
        Id: 'Event2',
        Title: 'Event Title 2',
        Description: 'Event Description 2',
        EventDateTime: moment().toISOString()
      }
    ]
  }
  const wrapper = shallow(<EventsCalendar {...props}/>)
  expect(wrapper.find('.timeline-item').length).toEqual(2 * 2) // one for mobile and one for desktop
})

it('renders link for each event title', () => {
  const props = {
    events: [
      {
        Id: 'Event1',
        Title: 'Event Title 1',
        Description: 'Event Description',
        EventDateTime: moment().toISOString()
      },
      {
        Id: 'Event2',
        Title: 'Event Title 2',
        Description: 'Event Description 2',
        EventDateTime: moment().toISOString()
      }
    ]
  }
  const wrapper = shallow(<EventsCalendar {...props}/>)
  expect(wrapper.find(Link).findWhere((n) => n.props().to === '/event/Event1').length).toEqual(2)
  expect(wrapper.find(Link).findWhere((n) => n.props().to === '/event/Event2').length).toEqual(2)
})
