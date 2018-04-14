import React from 'react'
import moment from 'moment'
import { shallow } from 'enzyme'

import { Link } from 'react-router-dom'
import HighlightedText from '../HighlightedText'
import TimelineItem from './TimelineItem.js'

it('does not crash on render', () => {
  const props = {
    searchResult: {
      item: {
        Id: '1',
        Title: 'Timeline 1',
        events: [
          {
            Id: 'e1',
            Title: 'Event 1',
            Description: 'This is event 1'
          }
        ]
      },
      matches: [
        {
          arrayIndex: 0,
          indices: [[9,9]],
          key: "Title",
          value: "Timeline 1"
        },
        {
          arrayIndex: 0,
          indices: [[6,6]],
          key: "events.Title",
          value: "Event 1"
        }
      ]
    }
  }
  const wrapper = shallow(<TimelineItem {...props} />)
})

it('renders match of timeline title', () => {
  const props = {
    searchResult: {
      item: {
        Id: '1',
        Title: 'Timeline 1',
        events: [
          {
            Id: 'e1',
            Title: 'Event 1',
            Description: 'This is event 1'
          }
        ]
      },
      matches: [
        {
          arrayIndex: 0,
          indices: [[9,9]],
          key: "Title",
          value: "Timeline 1"
        },
        {
          arrayIndex: 0,
          indices: [[6,6]],
          key: "events.Title",
          value: "Event 1"
        }
      ]
    }
  }
  const wrapper = shallow(<TimelineItem {...props} />)
  expect(wrapper.find(Link).length).toEqual(2)
  var timelineLinkWrapper = wrapper.find(Link).at(0)
  expect(timelineLinkWrapper.props().to).toEqual('/timeline/1')
  expect(timelineLinkWrapper.children().find(HighlightedText).length).toEqual(1)
  expect(timelineLinkWrapper.children().find(HighlightedText).props()).toEqual({
    children: "Timeline 1",
    matches:  [[9,9]]
  })
  var eventLinkWrapper = wrapper.find(Link).at(1)
  expect(eventLinkWrapper.props().to).toEqual('/event/e1')
  expect(eventLinkWrapper.children().find(HighlightedText).length).toEqual(1)
  expect(eventLinkWrapper.children().find(HighlightedText).props()).toEqual({
    children: "Event 1",
    matches:  [[6,6]]
  })
})
