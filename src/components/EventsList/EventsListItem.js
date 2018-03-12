import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class EventsListItem extends Component {
  render() {
    return (
      <Link to={`/event/${this.props.Id}`}>
        <div className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <h3 className="title">{this.props.Title}</h3>
                  {
                    this.props.EventDateTime
                    ? (
                      <time className="subtitle">{moment(this.props.EventDateTime).format("dddd, MMMM Do YYYY, h:mm:ss a")}</time>
                    )
                    : null
                  }
              </div>
            </div>
          </div>
          <div className="card-content">
            <div className="content">
              {this.props.Description}
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

EventsListItem.propTypes = {
  Id: PropTypes.string,
  Title: PropTypes.string,
  Description: PropTypes.string,
  Location: PropTypes.string,
  EventDateTime: PropTypes.string,
  CreationTimeStamp: PropTypes.number,
  synced: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.object
}

export default EventsListItem
