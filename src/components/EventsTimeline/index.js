import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'

class EventsTimeline extends Component {
  constructor () {
    super()

    this.state = {
      mode: 4 // single | day | month | year
    }
  }

  handleModeChange (mode) {
    if (mode >= 1 && mode <= 4) {
      this.setState({
        mode: mode
      })
    }
  }

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

    return (
      <div>
        <div className="buttons pull-right">
          <button onClick={() => {this.handleModeChange(this.state.mode + 1)}} className="button is-circle">
            <i className="fa fa-plus"></i>
          </button>
          <button onClick={() => {this.handleModeChange(this.state.mode - 1)}} className="button is-circle">
            <i className="fa fa-minus"></i>
          </button>
        </div>
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
    switch (this.state.mode) {
      case 4:
        return this.renderEventsSingle()
      case 3:
        return this.renderEventsDay()
      case 2:
        return this.renderEventsMonth()
      case 1:
        return this.renderEventsYear()
      default:
        break;
    }
  }

  renderEventsYear () {
    var years = this.props.events.reduce(function (acc, event) {
      if (!event.EventDateTime) return acc
      var year = moment(event.EventDateTime).format('YYYY')
      if (acc[year]) acc[year].push(event)
      else acc[year] = [event]
      return acc
    }, {})

    return Object.keys(years).map(function (year) {
      var events = years[year]
      var yearMoment = moment(year, 'YYYY')

      return (
        <div key={year} className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <div className="box is-primary">
             <div className="ml-sm is-size-7 has-text-grey">
                {
                  yearMoment.format('YYYY')
                } - {events.length} events
              </div>
              <ul>
                {
                  events.map(function (event) {
                    return (
                      <li>
                        <Link to={`/event/${event.Id}`}>{event.Title}</Link>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      )
    })
  }

  renderEventsMonth () {
    var months = this.props.events.reduce(function (acc, event) {
      if (!event.EventDateTime) return acc
      var month = moment(event.EventDateTime).format('MM-YYYY')
      if (acc[month]) acc[month].push(event)
      else acc[month] = [event]
      return acc
    }, {})

    return Object.keys(months).map(function (month) {
      var events = months[month]
      var monthMoment = moment(month, 'MM-YYYY')

      return (
        <div key={month} className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <div className="box is-primary">
              <div className="ml-sm is-size-7 has-text-grey">
                {
                  monthMoment.format('MMMM YYYY')
                } - {events.length} events
              </div>
              <ul>
                {
                  events.map(function (event) {
                    return (
                      <li>
                        <Link to={`/event/${event.Id}`}>{event.Title}</Link>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      )
    })
  }

  renderEventsDay () {
    var days = this.props.events.reduce(function (acc, event) {
      if (!event.EventDateTime) return acc
      var day = moment(event.EventDateTime).format('DD-MM-YYYY')
      if (acc[day]) acc[day].push(event)
      else acc[day] = [event]
      return acc
    }, {})

    return Object.keys(days).map(function (day) {
      var events = days[day]
      var dayMoment = moment(day, 'DD-MM-YYYY')

      return (
        <div key={day} className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <div className="box is-primary">
              <div className="ml-sm is-size-7 has-text-grey">
                {
                  dayMoment.format('dddd, MMMM Do YYYY')
                } - {events.length} events
              </div>
              <ul>
                {
                  events.map(function (event) {
                    return (
                      <li>
                        <Link to={`/event/${event.Id}`}>{event.Title}</Link>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      )
    })
  }

  renderEventsSingle () {
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
