import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Map from '../EventMap/Map'
import { Marker } from 'react-google-maps'
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox'


var DEFAULT_MAP_CENTER = {
  lat: 55.8661611339259,
  lng: -4.250850677490234
}

class LocationInput extends Component {
  constructor (props) {
    super(props)

    this.state = {
      center: DEFAULT_MAP_CENTER
    }

    if (props.value) {
      this.state.center = {
        lat: parseFloat(props.value.split(',')[0]),
        lng: parseFloat(props.value.split(',')[1])
      }
    }

    this.onMapLoaded = this.onMapLoaded.bind(this)
    this.onMapClick = this.onMapClick.bind(this)
    this.onBoundsChanged = this.onBoundsChanged.bind(this)

    this.onSearchBoxLoaded = this.onSearchBoxLoaded.bind(this)
    this.onSearchBoxPlaceChange = this.onSearchBoxPlaceChange.bind(this)
    this.renderMapChildren = this.renderMapChildren.bind(this)
  }

  onMapLoaded (map) {
    this.map = map
  }

  onSearchBoxLoaded (searchBox) {
    this.searchBox = searchBox
  }

  onSearchBoxPlaceChange () {
    if (!this.searchBox.getPlaces().length) return
    this.setState({
      center: {
        lat: this.searchBox.getPlaces()[0].geometry.location.lat(),
        lng: this.searchBox.getPlaces()[0].geometry.location.lng()
      }
    })
  }

  onBoundsChanged () {
    this.setState({
      center: this.map.getCenter(),
    })
  }

  onMapClick (data) {
    var coords = {
      lat: data.latLng.lat(),
      lng: data.latLng.lng()
    }
    var coordsString = [
      coords.lat,
      coords.lng
    ].join(',')

    this.props.onChange(coordsString)
  }

  componentWillReceiveProps (props) {
    this.setState({
      center: {
        lat: parseFloat(props.value.split(',')[0]),
        lng: parseFloat(props.value.split(',')[1])
      }
    })
  }

  getMarkerCoords () {
    if (!this.props.value) return null
    return {
      lat: parseFloat(this.props.value.split(',')[0]),
      lng: parseFloat(this.props.value.split(',')[1])
    }
  }

  render () {
    return (
      <div className="field">
        <div className="label">{this.props.label}</div>
        <div className="control">
          <Map
            mapProps={{
              ref: this.onMapLoaded,
              center: this.state.center,
              onClick: this.onMapClick,
              onIdle: this.onBoundsChanged
            }}
            mapChildren={this.renderMapChildren}
          />
        </div>
      </div>
    )
  }

  renderMapChildren (google) {
    // stops the search input Enter to submit the outer form
    var preventFormSubmission = function (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    var elements = [
      (
        <SearchBox
          key='searchBox'
          ref={this.onSearchBoxLoaded}
          controlPosition={google.maps.ControlPosition.TOP}
          onPlacesChanged={this.onSearchBoxPlaceChange}
        >
          <form onSubmit={preventFormSubmission}>
            <div className="field mt-sm ml-sm">
              <div className="control">
                <input className="input is-small" type="text" placeholder='Search location...' />
              </div>
            </div>
          </form>
        </SearchBox>
      )
    ]
    if (this.getMarkerCoords()) {
      elements.push(<Marker key='marker' position={this.getMarkerCoords()} />)
    }
    return elements
  }
}

LocationInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default LocationInput
