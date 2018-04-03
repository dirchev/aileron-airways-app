import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'

class EventsTimeline extends Component {
  render() {
    // we need this in order to show timeline centered on desktop and on the left on mobile
    var timelineContent = (
      <Fragment>
        <header className="timeline-header">
          <span className="tag is-medium is-primary">Today</span>
        </header>
        {this.renderEvents()}
        <div className="timeline-header">
          <span className="tag is-medium is-primary">End</span>
        </div>
      </Fragment>
    )

    // this is not the right way to do things
    // the better way would be to have a class like "is-centered-desktop"
    // can be done in the future by submitting a PR to https://github.com/Wikiki/bulma-timeline
    return (
      <div>
        <div className="timeline is-hidden-touch is-centered">
          {timelineContent}
        </div>
        <div className="timeline is-hidden-desktop">
          {timelineContent}
        </div>
      </div>
    )
  }

  renderEvents () {
    return this.props.events.map(function (event) {
      return (
        <div key={event.Id} className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <Link to={`/event/${event.Id}`}  className="box is-primary">
              {
                event.EventDateTime
                ? (<span className="ml-sm is-size-7 has-text-grey">{moment(event.EventDateTime).format("dddd, MMMM Do YYYY, h:mm:ss a")}</span>)
                : null
              }
              <h3 className="is-size-5">
                <span>{event.Title}</span>
              </h3>
              <p>{event.Description}</p>
            </Link>
          </div>
        </div>
      )
    })
  }
}

EventsTimeline.propTypes = {
  events: PropTypes.array
}

export default EventsTimeline
