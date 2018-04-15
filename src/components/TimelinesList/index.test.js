import React from 'react'
import moment from 'moment'
import { shallow } from 'enzyme'

import { TimelinesList } from './index.js'
import TimelineListItem from './TimelineListItem.js'

it('does not crash on render', () => {
  const props = {
    timelines: []
  }
  const wrapper = shallow(<TimelinesList {...props} />)
})

it('does not render anything on no timelines', () => {
  const props = {
    timelines: []
  }
  const wrapper = shallow(<TimelinesList {...props} />)
  expect(wrapper.find(TimelineListItem).length).toEqual(0)
})


it('renders TimelineListItem for each timeline', () => {
  var date = moment()
  const props = {
    timelines: [
      {
        Id: 'Timeline1',
        Title: 'Timeline Title 1',
        CreationTimeStamp: date.toISOString()
      },
      {
        Id: 'Timeline2',
        Title: 'Timeline Title 2',
        CreationTimeStamp: date.toISOString()
      }
    ]
  }
  const wrapper = shallow(<TimelinesList {...props}/>)
  expect(wrapper.find(TimelineListItem).findWhere((n) => n.props().Id === 'Timeline1').props()).toEqual({
    Id: 'Timeline1',
    Title: 'Timeline Title 1',
    CreationTimeStamp: date.toISOString()
  })
  expect(wrapper.find(TimelineListItem).findWhere((n) => n.props().Id === 'Timeline2').props()).toEqual({
    Id: 'Timeline2',
    Title: 'Timeline Title 2',
    CreationTimeStamp: date.toISOString()
  })
})
