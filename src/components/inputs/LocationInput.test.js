import React from 'react'
import { shallow } from 'enzyme'

import LocationInput from './LocationInput'
import Map from '../EventMap/Map'
import { Marker } from 'react-google-maps'
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox'

const googleMock = {
  maps: {
    ControlPosition: {
      TOP: 1
    }
  }
}

it('renders without crashing', function () {
  const props = {
    onChange: jest.fn()
  }
  const wrapper = shallow(<LocationInput {...props} />)
})

it('renders label', function () {
  const props = {
    label: 'Map',
    onChange: jest.fn()
  }
  const wrapper = shallow(<LocationInput {...props} />)
  expect(wrapper.find('.field>.label').length).toEqual(1)
  expect(wrapper.find('.field>.label').text()).toContain('Map')
})

it('renders map without marker', function () {
  const props = {
    label: 'Map',
    onChange: jest.fn()
  }
  const wrapper = shallow(<LocationInput {...props} />)
  expect(wrapper.find(Map).length).toEqual(1)
  var mapChildren = wrapper.find(Map).prop('mapChildren')(googleMock)
  expect(mapChildren.length).toEqual(1)
})

it('renders map with marker', function () {
  const props = {
    label: 'Map',
    value: '55.8661611339259, -4.250850677490234',
    onChange: jest.fn()
  }
  const wrapper = shallow(<LocationInput {...props} />)
  expect(wrapper.find(Map).length).toEqual(1)
  var mapChildren = wrapper.find(Map).prop('mapChildren')(googleMock)
  expect(mapChildren.length).toEqual(2)
})
