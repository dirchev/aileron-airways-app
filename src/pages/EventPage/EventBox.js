import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import titleValidator from '../../validators/title'
import descriptionValidator from '../../validators/description'

import EditableText from '../../components/inputs/EditableText'
import EditableTextArea from  '../../components/inputs/EditableTextArea'
import EventMap from '../../components/EventMap'
import EditableLocation from '../../components/inputs/EditableLocation'

class EventBox extends Component {
  getCoords (event) {
    var location = event.Location.split(',')
    return {
      lat: parseFloat(location[0]),
      lng: parseFloat(location[1])
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card-content">
          <div className="title">
            <EditableText defaultValue={this.props.event.Title} onChange={this.props.handleTitleChange} validator={titleValidator}>
              {this.props.event.Title}
            </EditableText>
          </div>
          {
            this.props.event.EventDateTime
              ? (
                <div className="subtitle">
                  <time>
                    {moment(this.props.event.EventDateTime).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                  </time>
                </div>
              )
              : null
          }
          <span>
            <EditableTextArea
              validator={descriptionValidator}
              defaultValue={this.props.event.Description}
              onChange={this.props.handleDescriptionChange}
            >
              {this.props.event.Description}
            </EditableTextArea>
          </span>
          <div className="mt-md">
            <EditableLocation defaultValue={this.props.event.Location} onChange={this.props.handleLocationChange}>
              {
                this.props.event.Location
                ? (<EventMap {...this.getCoords(this.props.event)} />)
                : null
              }
            </EditableLocation>
          </div>
        </div>
      </div>
    )
  }
}

EventBox.propTypes = {
  event: PropTypes.shape({
    Id: PropTypes.string.isRequired,
    TimelineId: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    EventDateTime: PropTypes.string.isRequired,
    Location: PropTypes.string,
  }).isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
  /* handleEventDateTimeChange: PropTypes.func.isRequired,*/
  handleLocationChange: PropTypes.func.isRequired,
}

export default EventBox
