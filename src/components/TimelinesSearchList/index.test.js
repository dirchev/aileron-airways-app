import React from 'react'
import moment from 'moment'
import { shallow } from 'enzyme'

import { TimelinesSearchList } from './index.js'
import TimelineItem from './TimelineItem.js'

it('does not crash on render', () => {
  const props = {
    timelines: [],
    timelinesFilter: 'a'
  }
  const wrapper = shallow(<TimelinesSearchList {...props} />)
})

it('does not show results on no timeliens', () => {
  const props = {
    timelines: [],
    timelinesFilter: 'a'
  }
  const wrapper = shallow(<TimelinesSearchList {...props} />)
  expect(wrapper.find(TimelineItem).length).toEqual(0)
})


it('shows a message on no filter', () => {
  const props = {
    timelines: [
      {
        Id: '1',
        Title: 'Timeline1',
        events: []
      },
      {
        Id: '2',
        Title: 'Timeline2',
        events: []
      }
    ],
    timelinesFilter: ''
  }
  const wrapper = shallow(<TimelinesSearchList {...props} />)
  expect(wrapper.find(TimelineItem).length).toEqual(0)
  expect(wrapper.find('div.notification').length).toEqual(1)
  expect(wrapper.text()).toContain('Please specify a search term.')
})


it('shows only filtered timelines', () => {
  const props = {
    timelines: [
      {
        Id: '1',
        Title: 'Timeline1',
        events: []
      },
      {
        Id: '2',
        Title: 'Timeline2',
        events: []
      }
    ],
    timelinesFilter: '2'
  }
  const wrapper = shallow(<TimelinesSearchList {...props} />)
  expect(wrapper.find('div.notification').length).toEqual(1)
  expect(wrapper.find('div.notification').text()).toContain('Showing results for "2"')
  expect(wrapper.find(TimelineItem).length).toEqual(1)
  expect(wrapper.find(TimelineItem).props()).toEqual({
    searchResult: {
      item: {
        Id: '2',
        Title: 'Timeline2',
        events: []
      },
      matches: [{
        arrayIndex: 0,
        indices: [[8,8]],
        key: "Title",
        value: "Timeline2"
      }]
    }
  })
})
