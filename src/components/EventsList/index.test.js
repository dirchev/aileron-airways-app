import React from 'react'
import { shallow } from 'enzyme'

import EventsList from './index.js'
import Pagination from './../Pagination.js'
import Event from './EventsListItem.js'

it('does not crash on render', () => {
  const props = {
    events: []
  }
  const wrapper = shallow(<EventsList {...props} />)
})

it('shows Event component for each event', () => {
  const props = {
    events: [
      {
        Id: 'Event1',
        Title: 'Event 1 Title',
        Description: 'Event 1 Description'
      }
    ]
  }
  const wrapper = shallow(<EventsList {...props} />)
  expect(wrapper.find(Event).length).toEqual(1)
  expect(wrapper.find(Event).props()).toEqual({
    Id: 'Event1',
    Title: 'Event 1 Title',
    Description: 'Event 1 Description'
  })
})

it('paginates events', () => {
  const props = {
    events: []
  }
  for (var i = 0; i < 20; i++) {
    props.events.push({
      Id: i.toString(),
      Title: `Event ${i}`,
      Description: `Event ${i}`
    })
  }
  const wrapper = shallow(<EventsList {...props} />)
  var paginationWrapper = wrapper.find(Pagination)
  expect(paginationWrapper.length).toEqual(1)
  expect(paginationWrapper.props().page).toEqual(1)
  expect(paginationWrapper.props().pages).toEqual(2)
})
