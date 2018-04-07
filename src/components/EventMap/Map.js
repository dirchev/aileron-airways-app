import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

var GOOGLE_MAPS_URL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDIXbgTi51O9JKlN9FCxFUkO6DJ274dwik&v=3.exp&libraries=geometry,drawing,places"

class Map extends Component {
  render () {
    return (
      <GoogleMap
        {...this.props.mapProps}
        defaultZoom={8}
        options={{disableDefaultUI: true}}
      >
        {this.props.mapChildren && this.props.mapChildren(window.google)}
        {this.props.children}
      </GoogleMap>
    )
  }
}

var MyMap = withScriptjs(withGoogleMap(Map))

class MapContainer extends Component {
  render () {
    return (
      <MyMap
        {...this.props}
        googleMapURL={GOOGLE_MAPS_URL}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}

export default MapContainer
