import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'

class EventsCalendar extends Component {
  constructor () {
    super()

    this.state = {
      month: moment().toISOString()
    }
  }

  changeMonth (month) {
    return (e) => {
      this.setState({month: month.toISOString()})
    }
  }

  render() {
    var month = moment(this.state.month)

    return (
      <div className="calendar is-large">
        <div className="calendar-nav">
          <div className="calendar-nav-previous-month">
            <a onClick={this.changeMonth(month.clone().subtract(1, 'month'))} className="has-text-white ml-sm">
              <i className="fa fa-chevron-left"></i>
            </a>
          </div>
          <div>{month.format('MMM YYYY')}</div>
          <div className="calendar-nav-next-month">
            <a onClick={this.changeMonth(month.clone().add(1, 'month'))} className="has-text-white mr-sm">
              <i className="fa fa-chevron-right"></i>
            </a>
          </div>
        </div>
        <div className="calendar-container">
          <div className="calendar-header">
            {this.renderWeekDays(month)}
          </div>
          <div className="calendar-body">
            {this.renderCalendarDates(month)}
          </div>
        </div>
      </div>
    )
  }

  renderWeekDays (month) {
    var days = []
    var startDate = month.clone().startOf('week')
    var endDate = month.clone().endOf('week')

    while (true) {
      if (startDate.isAfter(endDate)) break
      days.push(
        <div key={startDate.format('dddd')} className="calendar-date">{startDate.format('dddd')}</div>
      )

      startDate.add(1, 'day')
    }

    return days
  }

  renderCalendarDates (month) {
    var startDate = month.clone().startOf('month').startOf('week')
    var endDate = month.clone().endOf('month').endOf('week')
    var dates = []
    while (true) {
      if (startDate.isAfter(endDate)) break
      let isDisabled = !startDate.isSame(month, 'month')
      let isToday = !startDate.isSame(moment(), 'day')

      dates.push(
        <div
          key={startDate.toISOString()}
          className={`calendar-date ${isDisabled ? 'is-disabled' : ''} ${isToday ? 'is-today' : ''}`}
        >
          <button className="date-item">{startDate.format('D')}</button>
          {this.renderDateEvents(startDate)}
        </div>
      )
      startDate.add(1, 'day')
    }

    return dates
  }

  renderDateEvents (date) {
    var events = this.props.events.filter(function (event) {
      return moment(event.EventDateTime).isSame(date, 'day')
    })
    if (!events.length) return null
    return (
      <div className="calendar-events">
        {
          events.map(function (event) {
            return (
              <Link key={event.Id} to={`/event/${event.Id}`} className="calendar-event is-primary">
                {event.Title}
              </Link>
            )
          })
        }
      </div>
    )
  }
}

EventsCalendar.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    Id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    EventDateTime: PropTypes.string.isRequired
  })).isRequired
}

export default EventsCalendar
