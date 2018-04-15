import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'

import { HomePage } from './HomePage'

import Navigation from '../components/Navigation'
import TimelineRegister from '../components/TimelineRegister'
import TimelinesSearchList from '../components/TimelinesSearchList'
import TimelineCreateButton from '../components/nav-items/CreateTimelineButton'
import TimelineSearch from '../components/TimelineSearch'

it('renders without crashing', function () {
  const props = {
    timelines: [{
      Id: '1',
      Title: 'Title',
      CreationTimeStamp: moment().toISOString(),
    }],
    hasFiltersApplied: false,
    fetchAll: jest.fn(),
  }

  const wrapper = shallow(<HomePage {...props} />)
  expect(props.fetchAll).toBeCalled()
})

it('shows timelines list on no filters', function () {
  const props = {
    timelines: [{
      Id: '1',
      Title: 'Title',
      CreationTimeStamp: moment().toISOString(),
    }],
    hasFiltersApplied: false,
    fetchAll: jest.fn(),
  }

  const wrapper = shallow(<HomePage {...props} />)
  expect(wrapper.find(TimelineRegister).length).toEqual(1)
  expect(wrapper.find(TimelinesSearchList).length).toEqual(0)
})

it('shows timelines list on filters', function () {
  const props = {
    timelines: [{
      Id: '1',
      Title: 'Title',
      CreationTimeStamp: moment().toISOString(),
    }],
    hasFiltersApplied: true,
    fetchAll: jest.fn(),
  }

  const wrapper = shallow(<HomePage {...props} />)
  expect(wrapper.find(TimelineRegister).length).toEqual(0)
  expect(wrapper.find(TimelinesSearchList).length).toEqual(1)
})

it('shows additional components', function () {
  const props = {
    timelines: [{
      Id: '1',
      Title: 'Title',
      CreationTimeStamp: moment().toISOString(),
    }],
    hasFiltersApplied: false,
    fetchAll: jest.fn(),
  }

  const wrapper = shallow(<HomePage {...props} />)
  expect(wrapper.find(TimelineSearch).length).toEqual(1)
  expect(wrapper.find(Navigation).length).toEqual(1)
})
