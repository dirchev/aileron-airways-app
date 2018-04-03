import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class EventsListItem extends Component {
  render() {
    return (
      <Link to={`/event/${this.props.Id}`} className="box is-primary mb-sm">
        <h3 className="is-size-5">
          <span>{this.props.Title}</span>
          {
            this.props.EventDateTime
            ? (<span className="ml-sm is-size-7 has-text-grey">{moment(this.props.EventDateTime).format("dddd, MMMM Do YYYY, h:mm:ss a")}</span>)
            : null
          }
        </h3>
        <p>{this.props.Description}</p>
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
