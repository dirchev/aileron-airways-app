import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'

import DatetimeInput from './DatetimeInput'
import Datetime from 'react-datetime'

it('renders without crashing', function () {
  const props = {}
  const wrapper = shallow(<DatetimeInput {...props} />)
})

it('renders textarea without label', function () {
  const props = {}
  const wrapper = shallow(<DatetimeInput {...props} />)
  expect(wrapper.find('.field').length).toEqual(1)
  expect(wrapper.find('label.label').length).toEqual(0)
  expect(wrapper.find('.control').length).toEqual(1)
  expect(wrapper.find(Datetime).length).toEqual(1)
})

it('renders textarea with label', function () {
  const props = {
    label: 'Date'
  }
  const wrapper = shallow(<DatetimeInput {...props} />)
  expect(wrapper.find('.field').length).toEqual(1)
  expect(wrapper.find('label.label').length).toEqual(1)
  expect(wrapper.find('label.label').text()).toContain('Date')
  expect(wrapper.find('.control').length).toEqual(1)
  expect(wrapper.find(Datetime).length).toEqual(1)
})

it('triggers onChange', function () {
  const props = {
    label: 'Date',
    value: moment().toISOString(),
    onChange: jest.fn()
  }
  const wrapper = shallow(<DatetimeInput {...props} />)
  expect(wrapper.find('.field').length).toEqual(1)
  expect(wrapper.find('label.label').length).toEqual(1)
  expect(wrapper.find('label.label').text()).toContain('Date')
  expect(wrapper.find('.control').length).toEqual(1)
  expect(wrapper.find(Datetime).length).toEqual(1)
  expect(props.onChange).not.toBeCalled()
  const date = moment()
  wrapper.find(Datetime).simulate('change', date)
  expect(props.onChange).toBeCalledWith(date.toISOString())
})

it('sets and update the value of Datetime', function () {
  var date = moment()
  const props = {
    label: 'Date',
    value: date.toISOString(),
    onChange: jest.fn()
  }
  const wrapper = shallow(<DatetimeInput {...props} />)
  expect(wrapper.find(Datetime).length).toEqual(1)
  expect(moment(wrapper.find(Datetime).prop('value')).isSame(date)).toEqual(true)
  const newDate = moment().add(3, 'days')
  wrapper.setProps({
    value: newDate.toISOString()
  })
  expect(moment(wrapper.find(Datetime).prop('value')).isSame(newDate)).toEqual(true)
})
