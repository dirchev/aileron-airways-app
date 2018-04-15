import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { shallow } from 'enzyme'

import TimelineListItem from './TimelineListItem.js'

it('does not crash on render', () => {
  const props = {
    Id: 'timeline1',
    Title: 'Timeline One',
    CreationTimeStamp: moment().toISOString()
  }
  const wrapper = shallow(<TimelineListItem {...props} />)
})

it('render link on render', () => {
  var date = moment()
  const props = {
    Id: 'timeline1',
    Title: 'Timeline One',
    CreationTimeStamp: date.toISOString()
  }
  const wrapper = shallow(<TimelineListItem {...props} />)
  expect(wrapper.find(Link).length).toEqual(1)
  expect(wrapper.find(Link).children().text()).toContain('Timeline One')
  expect(wrapper.find(Link).children().text()).toContain(date.fromNow())
})

it('handles timeline loading', () => {
  var date = moment()
  const props = {
    Id: 'timeline1',
    Title: 'Timeline One',
    CreationTimeStamp: date.toISOString(),
    loading: true
  }
  const wrapper = shallow(<TimelineListItem {...props} />)
  expect(wrapper.find(Link).length).toEqual(1)
  expect(wrapper.find(Link).children().text()).toContain('Timeline One')
  expect(wrapper.find(Link).children().text()).toContain('Loading...')
})

it('handles timeline error', () => {
  var date = moment()
  const props = {
    Id: 'timeline1',
    Title: 'Timeline One',
    CreationTimeStamp: date.toISOString(),
    loading: false,
    error: {message: 'some error'}
  }
  const wrapper = shallow(<TimelineListItem {...props} />)
  expect(wrapper.find(Link).length).toEqual(1)
  expect(wrapper.find(Link).children().text()).toContain('Timeline One')
  expect(wrapper.find(Link).children().text()).toContain('some error')
})
