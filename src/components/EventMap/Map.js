import React, { Component } from 'react'
import { withGoogleMap, GoogleMap } from "react-google-maps"

class Map extends Component {
  render () {
    return (
      <GoogleMap
        {...this.props.mapProps}
        defaultZoom={13}
        options={{disableDefaultUI: true}}
      >
        {this.props.mapChildren && this.props.mapChildren(window.google)}
        {this.props.children}
      </GoogleMap>
    )
  }
}

var MyMap = withGoogleMap(Map)

class MapContainer extends Component {
  render () {
    return (
      <MyMap
        {...this.props}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}

export default MapContainer
