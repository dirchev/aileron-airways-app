import React, { Component } from 'react'

import Map from './Map'
import { Marker } from "react-google-maps"

class EventMap extends Component {
  render () {
    var coords = {
      lat: this.props.lat,
      lng: this.props.lng
    }
    return (
      <Map mapProps={{defaultCenter: coords}}>
        <Marker position={coords} />
      </Map>
    )
  }
}

export default EventMap
