import React, { Component } from 'react'

import Map from './Map'
import { Marker } from "react-google-maps"

class EventMap extends Component {
  constructor () {
    super()

    this.state = {
      placeLabel: null
    }
  }

  loadPlaceLabel (props) {
    props = props || this.props
    var geocoder = new window.google.maps.Geocoder()
    var latLng = new window.google.maps.LatLng({lat: props.lat, lng: props.lng})

    geocoder.geocode({
      location: latLng,
    }, (geocodeResult) => {
      this.setState({placeLabel: geocodeResult[0].formatted_address})
    })
  }

  componentDidMount () {
    this.loadPlaceLabel()
  }

  componentWillReceiveProps (props) {
    this.loadPlaceLabel(props)
  }

  render () {
    var coords = {
      lat: this.props.lat,
      lng: this.props.lng
    }
    return (
      <div>
        {
          this.state.placeLabel
          ? (<div>{this.state.placeLabel}</div>)
          : null
        }
        <Map mapProps={{defaultCenter: coords}}>
          <Marker position={coords} />
        </Map>
      </div>
    )
  }
}

export default EventMap
