import React from 'react'
import moment from 'moment'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'

import EventsListItem from './EventsListItem.js'

it('does not crash on render', () => {
  var date = moment()
  const props = {
    Id: 'event1',
    Title: 'Title',
    Description: 'Some Description',
    EventDateTime: date.toISOString()
  }
  const wrapper = shallow(<EventsListItem {...props} />)
})

it('contains a link to the event', () => {
  var date = moment()
  const props = {
    Id: 'event1',
    Title: 'Title',
    Description: 'Some Description',
    EventDateTime: date.toISOString()
  }
  const wrapper = shallow(<EventsListItem {...props} />)
  expect(wrapper.find(Link).length).toEqual(1)
  const linkWrapper = wrapper.find(Link)
  expect(linkWrapper.props().to).toEqual("/event/event1")
  expect(linkWrapper.children('h3').text()).toContain("Title")
  expect(linkWrapper.children('h3').text()).toContain(date.format("dddd, MMMM Do YYYY, h:mm:ss a"))
  expect(linkWrapper.children('p').text()).toContain("Some Description")
})
