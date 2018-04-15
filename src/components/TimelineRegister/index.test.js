import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'

import { TimelineRegister } from './index.js'
import Pagination from '../Pagination'

it('renders without crashing', function () {
  const props = {
    timelines: [
      {
        Id: '1',
        Title: 'Title',
        CreationTimeStamp: moment().toISOString(),
        NoEvents: 2,
        LastEventDate: moment().toISOString()
      }
    ]
  }
  const wrapper = shallow(<TimelineRegister {...props} />)
})

it('renders pagination on more than 1 pages', function () {
  const props = {
    timelines: [
      {
        Id: '1',
        Title: 'Title',
        CreationTimeStamp: moment().toISOString(),
        NoEvents: 2,
        LastEventDate: moment().toISOString()
      },
      {
        Id: '2',
        Title: 'Title',
        CreationTimeStamp: moment().toISOString(),
        NoEvents: 2,
        LastEventDate: moment().toISOString()
      },
      {
        Id: '3',
        Title: 'Title',
        CreationTimeStamp: moment().toISOString(),
        NoEvents: 2,
        LastEventDate: moment().toISOString()
      },
      {
        Id: '4',
        Title: 'Title',
        CreationTimeStamp: moment().toISOString(),
        NoEvents: 2,
        LastEventDate: moment().toISOString()
      }
    ]
  }
  const wrapper = shallow(<TimelineRegister {...props} />)
  wrapper.setState({limit: 1})
  expect(wrapper.find(Pagination).prop('page')).toEqual(1)
  expect(wrapper.find(Pagination).prop('pages')).toEqual(4)
  expect(wrapper.find(Pagination).prop('onPageChange')).toBeDefined()
})

it('renders row for each timeline', function () {
  const props = {
    timelines: [
      {
        Id: '1',
        Title: 'Title',
        CreationTimeStamp: moment().toISOString(),
        NoEvents: 2,
        LastEventDate: moment().toISOString()
      },
      {
        Id: '2',
        Title: 'Title',
        CreationTimeStamp: moment().toISOString(),
        NoEvents: 2,
        LastEventDate: moment().toISOString()
      },
      {
        Id: '3',
        Title: 'Title',
        CreationTimeStamp: moment().toISOString(),
        NoEvents: 2,
        LastEventDate: moment().toISOString()
      },
      {
        Id: '4',
        Title: 'Title',
        CreationTimeStamp: moment().toISOString(),
        NoEvents: 2,
        LastEventDate: moment().toISOString()
      }
    ]
  }
  const wrapper = shallow(<TimelineRegister {...props} />)
  expect(wrapper.find('tbody>tr').length).toEqual(props.timelines.length)
  props.timelines.forEach(function (timeline, index) {
    var trWrapper = wrapper.find('tbody>tr').at(index)
    expect(trWrapper).toBeDefined()
    expect(trWrapper.text()).toContain(timeline.Title)
    expect(trWrapper.text()).toContain(timeline.NoEvents)
    expect(trWrapper.text()).toContain(moment(timeline.CreationTimeStamp).format('DD MMM YYYY HH:mm'))
    expect(trWrapper.text()).toContain(moment(timeline.LastEventDate).format('DD MMM YYYY HH:mm'))
  })
})

it('supports sorting', function () {
  const props = {
    timelines: [
      {
        Id: '1',
        Title: 'ATitle',
        CreationTimeStamp: moment().toISOString(),
        NoEvents: 1,
        LastEventDate: moment().toISOString()
      },
      {
        Id: '2',
        Title: 'BTitle',
        CreationTimeStamp: moment().toISOString(),
        NoEvents: 2,
        LastEventDate: moment().toISOString()
      },
      {
        Id: '3',
        Title: 'CTitle',
        CreationTimeStamp: moment().toISOString(),
        NoEvents: 3,
        LastEventDate: moment().toISOString()
      },
      {
        Id: '4',
        Title: 'DTitle',
        CreationTimeStamp: moment().toISOString(),
        NoEvents: 4,
        LastEventDate: moment().toISOString()
      }
    ]
  }
  const wrapper = shallow(<TimelineRegister {...props} />)
  expect(wrapper.find('tbody>tr').at(0).text()).toContain('ATitle')
  expect(wrapper.find('tbody>tr').at(0).text()).toContain('ATitle')
  wrapper.find('th').at(0).simulate('click') // title desc
  expect(wrapper.find('tbody>tr').at(0).text()).toContain('DTitle')
  expect(wrapper.find('tbody>tr').at(0).text()).toContain('DTitle')
  wrapper.find('th').at(2).simulate('click') // no events asc
  expect(wrapper.find('tbody>tr').at(0).text()).toContain('1')
  expect(wrapper.find('tbody>tr').at(0).text()).toContain('1')
  wrapper.find('th').at(2).simulate('click') // no events desc
  expect(wrapper.find('tbody>tr').at(0).text()).toContain('4')
  expect(wrapper.find('tbody>tr').at(0).text()).toContain('4')
})
