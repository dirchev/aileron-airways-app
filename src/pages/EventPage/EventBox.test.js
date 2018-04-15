import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'

import EventBox from './EventBox'

import EditableText from '../../components/inputs/EditableText'
import EditableTextArea from  '../../components/inputs/EditableTextArea'
import EventMap from '../../components/EventMap'
import EditableLocation from '../../components/inputs/EditableLocation'

it('renders without crashing', function () {
  const props = {
    event: {
      Id: '1',
      TimelineEventId: '1t',
      Title: 'Something',
      Description: 'Description',
      EventDateTime: moment().toISOString(),
      Location: '1.0,2.0'
    },
    handleTitleChange: jest.fn(),
    handleDescriptionChange: jest.fn(),
    handleEventDateTimeChange: jest.fn(),
    handleLocationChange: jest.fn(),
  }
  const wrapper = shallow(<EventBox {...props} />)
})

it('renders editable fields', function () {
  const props = {
    event: {
      Id: '1',
      TimelineEventId: '1t',
      Title: 'Something',
      Description: 'Description',
      EventDateTime: moment().toISOString(),
      Location: '1.0,2.0'
    },
    handleTitleChange: jest.fn(),
    handleDescriptionChange: jest.fn(),
    handleEventDateTimeChange: jest.fn(),
    handleLocationChange: jest.fn(),
  }
  const wrapper = shallow(<EventBox {...props} />)

  expect(wrapper.find(EditableText).length).toEqual(1)
  expect(wrapper.find(EditableText).props().defaultValue).toEqual(props.event.Title)
  expect(wrapper.find(EditableText).props().onChange).toEqual(props.handleTitleChange)

  expect(wrapper.find(EditableTextArea).length).toEqual(1)
  expect(wrapper.find(EditableTextArea).props().defaultValue).toEqual(props.event.Description)
  expect(wrapper.find(EditableTextArea).props().onChange).toEqual(props.handleDescriptionChange)

  expect(wrapper.find(EditableLocation).length).toEqual(1)
  expect(wrapper.find(EditableLocation).props().defaultValue).toEqual(props.event.Location)
  expect(wrapper.find(EditableLocation).props().onChange).toEqual(props.handleLocationChange)

  // expect(wrapper.find(EditableDateTime)).toEqual(1)
  // expect(wrapper.find(EditableDateTime).props().defaultValue).toEqual(props.event.EventDateTime)
  // expect(wrapper.find(EditableDateTime).props().onChange).toEqual(props.handleEventDateTimeChange)
})
