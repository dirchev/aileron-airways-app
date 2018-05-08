import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Fuse from 'fuse.js'

import Input from '../../components/inputs/Input'
import EventsList from '../../components/EventsList'
import EventsTimeline from '../../components/EventsTimeline'
import EventsCalendar from '../../components/EventsCalendar'

const FUSE_OPTIONS = {
  keys: [
    {name: 'Title', weight: 0.7},
    {name: 'Description', weight: 0.5}
  ]
}

// Holds the different view modes of events in a timeline:
// Calendar, List and Timeline
// and supports filtering of those events
class TimelineEvents extends Component {
  constructor (props) {
    super(props)
    this.state = {
      viewMode: 'list',
      searchTerm: '',
      events: props.timeline.events
    }

    this.handleChangeViewMode = this.handleChangeViewMode.bind(this)
    this.handleChangeSearchTerm = this.handleChangeSearchTerm.bind(this)
    this.fuseSearch = new Fuse(this.state.events, FUSE_OPTIONS)
  }

  handleChangeViewMode (viewMode) {
    return (e) => {
      e.preventDefault()
      this.setState({viewMode})
    }
  }

  handleChangeSearchTerm (searchTerm, event) {
    if (!searchTerm) {
      this.setState({
        searchTerm,
        events: this.props.timeline.events
      })
    } else {
      this.setState({
        searchTerm,
        events: this.fuseSearch.search(searchTerm)
      })
    }
  }

  // every time there are new props - we need to re-calculate the search results
  componentWillReceiveProps (nextProps) {
    // the events array has been changed. re-initialize the search
    if (!_.isEqual(this.props.timeline.events, nextProps.timeline.events)) {
      this.fuseSearch = new Fuse(nextProps.timeline.events, FUSE_OPTIONS)
      this.setState({
        searchTerm: '',
        events: nextProps.timeline.events
      })
    }
  }

  render() {
    return (
      <div>
        <div className="columns">
          <div className="column">
            <Input
              value={this.state.searchTerm}
              placeholder="Filter events..."
              iconLeft="fa fa-search"
              onChange={this.handleChangeSearchTerm}
            />
          </div>
          <div className="column is-narrow">
            <div className="buttons has-addons is-right">
              <button onClick={this.handleChangeViewMode('list')} className={`button ${this.state.viewMode === 'list' ? 'is-primary': ''}`}>
                <span>List</span>
                <span className="icon is-small"><i className="fa fa-list-ul"></i></span>
              </button>
              <button onClick={this.handleChangeViewMode('calendar')} className={`button is-hidden-mobile ${this.state.viewMode === 'calendar' ? 'is-primary': ''}`}>
                <span>Calendar</span>
                <span className="icon is-small"><i className="fa fa-calendar"></i></span>
              </button>
              <button onClick={this.handleChangeViewMode('timeline')} className={`button ${this.state.viewMode === 'timeline' ? 'is-primary': ''}`}>
                <span>Timeline</span>
                <span className="icon is-small"><i className="fa fa-history"></i></span>
              </button>
            </div>
          </div>
        </div>
        {this.renderEvents()}
      </div>
    )
  }

  renderEvents () {
    if (!this.props.timeline.loadingEvents && !this.state.events.length) {
      return (
        <div className="notification is-info mt-md">
          <span>No events found for this timeline.</span>
        </div>
      )
    }
    if (this.state.viewMode === 'list') {
      return (<EventsList events={this.state.events} />)
    } else if (this.state.viewMode === 'calendar') {
      return (<EventsCalendar events={this.state.events} />)
    } else if (this.state.viewMode === 'timeline') {
      return (<EventsTimeline events={this.state.events} />)
    }
    return (
      <div>View can not be found</div>
    )
  }
}

TimelineEvents.propTypes = {
  timeline: PropTypes.shape({
    Id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    events: PropTypes.arrayOf(PropTypes.shape({
      Id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      TimelineId: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      EventDateTime: PropTypes.string.isRequired
    }))
  }).isRequired
}

export default TimelineEvents
