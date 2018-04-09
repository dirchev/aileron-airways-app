import React, { Component } from 'react'
import Event from './EventsListItem'
import PropTypes from 'prop-types'

import Pagination from '../Pagination'

class EventsList extends Component {
  constructor () {
    super()

    this.state = {
      page: 1
    }

    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handlePageChange (page) {
    this.setState({page})
  }

  render() {
    var skip = this.state.page * 10 - 10
    var eventsToShow = this.props.events.slice(0 + skip, 10 + skip)
    return (
      <div>
        {
          eventsToShow.map((event) => {
            return (
              <Event key={event.Id} {...event}/>
            )
          })
        }
        <Pagination
          page={this.state.page}
          pages={Math.ceil(this.props.events.length / 10)}
          onPageChange={this.handlePageChange} />
      </div>
    )
  }
}

EventsList.propTypes = {
  events: PropTypes.array
}

export default EventsList
