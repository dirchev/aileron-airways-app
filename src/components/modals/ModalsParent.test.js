import React from 'react'
import { shallow } from 'enzyme'

import { ModalsParent } from './ModalsParent'
import CreateTimelineModal from './CreateTimelineModal'
import CreateEventModal from './CreateEventModal'

it('renders without crashing', function () {
  const props = {
    onModalClose: jest.fn(),
    modalOpened: null,
    modalProps: null
  }
  const wrapper = shallow(<ModalsParent {...props} />)
})

it('does not show anything when no modal is opened', function () {
  const props = {
    onModalClose: jest.fn(),
    modalOpened: null,
    modalProps: null
  }
  const wrapper = shallow(<ModalsParent {...props} />)
  expect(wrapper.find('div').length).toEqual(1)
  expect(wrapper.find('div').children().length).toEqual(0)
})

it('renders modal without props', function () {
  const props = {
    onModalClose: jest.fn(),
    modalOpened: 'createTimeline',
    modalProps: null
  }
  const wrapper = shallow(<ModalsParent {...props} />)
  expect(wrapper.find(CreateTimelineModal).length).toEqual(1)
  expect(wrapper.find(CreateTimelineModal).props()).toMatchObject({
    onClose: props.onModalClose
  })
})

it('renders modal with props', function () {
  const props = {
    onModalClose: jest.fn(),
    modalOpened: 'createTimeline',
    modalProps: {
      timelineId: '1'
    }
  }
  const wrapper = shallow(<ModalsParent {...props} />)
  expect(wrapper.find(CreateTimelineModal).length).toEqual(1)
  expect(wrapper.find(CreateTimelineModal).props()).toMatchObject({
    timelineId: '1',
    onClose: props.onModalClose
  })
})

it('does not render unregistered modal', function () {
  const props = {
    onModalClose: jest.fn(),
    modalOpened: 'unregistered',
  }
  const wrapper = shallow(<ModalsParent {...props} />)
  expect(wrapper.find('div').length).toEqual(1)
  expect(wrapper.find('div').children().length).toEqual(0)
})
