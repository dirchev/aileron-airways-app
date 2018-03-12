import React, { Component } from 'react'
import Event from './EventsListItem'
import PropTypes from 'prop-types'

class EventsList extends Component {
  render() {
    return (
      <div>
        {
          this.props.events.map((event) => {
            return (
              <Event key={event.Id} {...event}/>
            )
          })
        }
      </div>
    )
  }
}

EventsList.propTypes = {
  events: PropTypes.array
}

export default EventsList
