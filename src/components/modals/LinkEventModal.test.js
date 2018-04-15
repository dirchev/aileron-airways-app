import React from 'react'
import moment from 'moment'
import { shallow } from 'enzyme'

import { LinkEventModal } from './LinkEventModal'

import Input from '../inputs/Input'

it('renders without crashing', function () {
  const props = {
    events: [],
    linkEvent: jest.fn(),
    onClose: jest.fn(),
  }
  const wrapper = shallow(<LinkEventModal {...props} />)
})

it('shows message on no event', function () {
  const props = {
    events: [],
    linkEvent: jest.fn(),
    onClose: jest.fn(),
  }
  const wrapper = shallow(<LinkEventModal {...props} />)
  expect(wrapper.text()).toContain('Can not find events to link to.')
})

it('updates search term properly', function () {
  const props = {
    events: [
      {
        Id: 'Some id',
        Title: 'Some Title',
        Description: 'Some description'
      }
    ],
    linkEvent: jest.fn(),
    onClose: jest.fn(),
  }
  const wrapper = shallow(<LinkEventModal {...props} />)
  wrapper.find(Input).simulate('change', 'something')
  expect(wrapper.state().searchTerm).toEqual('something')
})

it('shows links for each event', function () {
  const props = {
    events: [
      {
        Id: 'Some id',
        Title: 'Some Title',
        Description: 'Some description'
      },
      {
        Id: 'Some id 2',
        Title: 'Some Title',
        Description: 'Some description'
      }
    ],
    linkEvent: jest.fn(),
    onClose: jest.fn(),
  }
  const wrapper = shallow(<LinkEventModal {...props} />)
  expect(wrapper.find('a').length).toEqual(2)
})

it('executes link event with the event id on link click', function () {
  const props = {
    events: [
      {
        Id: 'Some id',
        Title: 'Some Title',
        Description: 'Some description'
      },
      {
        Id: 'Some id 2',
        Title: 'Some Title',
        Description: 'Some description'
      }
    ],
    linkEvent: jest.fn(),
    onClose: jest.fn(),
  }
  const wrapper = shallow(<LinkEventModal {...props} />)
  expect(wrapper.find('a').length).toEqual(2)
  wrapper.find('a').at(0).simulate('click', {preventDefault: jest.fn()})
  expect(props.linkEvent).toBeCalledWith('Some id')
  expect(props.onClose).toBeCalled()
})

it('closes modal on cancel', function () {
  const props = {
    events: [],
    linkEvent: jest.fn(),
    onClose: jest.fn(),
  }
  const wrapper = shallow(<LinkEventModal {...props} />)
  wrapper.find('button.is-danger').at(0).simulate('click', {preventDefault: jest.fn()})
  expect(props.onClose).toBeCalled()
  expect(props.linkEvent).not.toBeCalled()
})
