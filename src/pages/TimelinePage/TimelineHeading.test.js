import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import EditableText from '../../components/inputs/EditableText'

import TimelineHeading from './TimelineHeading'

it('renders without crashing', function () {
  const props = {
    timeline: {
      Id: '1',
      Title: 'Title',
      CreationTimeStamp: moment().toISOString(),
    },
    onTitleChange: jest.fn()
  }
  const wrapper = shallow(<TimelineHeading {...props} />)
})

it('renders editable text for the timeline title', function () {
  const props = {
    timeline: {
      Id: '1',
      Title: 'Title',
      CreationTimeStamp: moment().toISOString(),
    },
    onTitleChange: jest.fn()
  }
  const wrapper = shallow(<TimelineHeading {...props} />)
  expect(wrapper.find(EditableText).length).toEqual(1)
  expect(wrapper.find(EditableText).props()).toEqual({
    children: 'Title',
    defaultValue: 'Title',
    onChange: props.onTitleChange
  })
})
