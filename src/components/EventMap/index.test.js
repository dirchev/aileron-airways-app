import React from 'react'
import EventMap from './index.js'
import { Marker } from "react-google-maps"
import { shallow } from 'enzyme'

it('renders without error', () => {
  const props = {
    lat: '41.100000',
    lng: '20.100000'
  }
  var Geocoder = jest.fn()
  Geocoder.prototype.geocode = jest.fn()
  var LatLng = jest.fn()
  global.google = {
    maps: {
      Geocoder,
      LatLng
    }
  }
  const wrapper = shallow(<EventMap {...props} />)
})

it('shows a marker', () => {
  const props = {
    lat: '41.100000',
    lng: '20.100000'
  }
  var Geocoder = jest.fn()
  Geocoder.prototype.geocode = jest.fn()
  var LatLng = jest.fn()
  global.google = {
    maps: {
      Geocoder,
      LatLng
    }
  }
  const wrapper = shallow(<EventMap {...props} />)
  expect(wrapper.find(Marker).length).toEqual(1)
})

it('generates place address', () => {
  const props = {
    lat: '41.100000',
    lng: '20.100000'
  }
  var Geocoder = jest.fn()
  Geocoder.prototype.geocode = jest.fn()
  var LatLng = jest.fn()
  global.google = {
    maps: {
      Geocoder,
      LatLng
    }
  }
  const wrapper = shallow(<EventMap {...props} />)
  expect(wrapper.find(Marker).length).toEqual(1)
  expect(global.google.maps.Geocoder).toBeCalled()
  expect(global.google.maps.Geocoder.prototype.geocode).toBeCalled()
  expect(global.google.maps.LatLng).toBeCalled()
})
