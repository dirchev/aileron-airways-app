import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import eventActions from '../../action-creators/event'
import moment from 'moment'
import _ from 'lodash'
import Fuse from 'fuse.js'

import Input from '../inputs/Input'

const FUSE_OPTIONS = {
  keys: [
    {name: 'Title', weight: 0.7},
    {name: 'Description', weight: 0.5}
  ]
}

export class LinkEventModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      events: props.events,
      searchTerm: ''
    }

    this.handleEventSearchChange = this.handleEventSearchChange.bind(this)
    this.fuseSearch = new Fuse(this.props.events, FUSE_OPTIONS)
  }

  handleEventSearchChange (searchTerm) {
    // if there is not search term - get to initial state and return
    if (!searchTerm) {
      this.setState({searchTerm: '', events: this.props.events}) // no filter
      return
    }

    // else filter the events and update the state
    var events = this.fuseSearch.search(searchTerm)
    this.setState({
      events,
      searchTerm
    })
  }

  handleEventLink (eventId) {
    return (e) => {
      e.preventDefault()
      this.props.linkEvent(eventId)
      this.props.onClose()
    }
  }

  render() {
    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box panel">
            {
              this.state.events.length === 0
              ? (
                <div className="panel-block">
                  Can not find events to link to.
                </div>
              )
              : (
                <div className="panel-block">
                  <Input
                    placeholder="Search events..."
                    value={this.state.searchTerm}
                    onChange={this.handleEventSearchChange}
                    iconRight='fa fa-search'
                    autoFocus
                  />
                </div>
              )
            }
            {
              this.state.events.map((event) => {
                return (
                  <a key={event.Id} onClick={this.handleEventLink(event.Id)} className="panel-block">
                    <p>
                      <strong>{event.Title}</strong> <br/>
                      {event.Description}
                    </p>
                  </a>
                )
              })
            }
            <div className="panel-block">
              <button className="button is-danger" onClick={this.props.onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

LinkEventModal.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    Id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  })).isRequired,
  linkEvent: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  var eventId = ownProps.EventId
  var timelineId = ownProps.TimelineId
  var linkedEventsIds = state.eventLinks
    // filter to only links for this event
    .filter(function (link) {
      return link.TimelineEventId === eventId
    })
    // get event ids
    .map(function (link) {
      return link.LinkedToTimelineEventId
    })

  var events = _.chain(Object.keys(state.events))
    // get all events
    .map(function (eventId) {
      return state.events[eventId]
    })
    // filter to only events from this timeline
    .filter(function (event) {
      return event.TimelineId === timelineId
    })
    // filter out current event
    .filter(function (event) {
      return event.Id !== eventId
    })
    // filter out already linked events
    .filter(function (event) {
      return linkedEventsIds.indexOf(event.Id) === -1
    })
    .sortBy(function (event) {
      return moment(event.EventDateTime).toISOString()
    })
    .reverse()
    .value()
  return {
    events: events
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    linkEvent: (eventToLinkId) => {
      dispatch(eventActions.linkEvent(ownProps.EventId, eventToLinkId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkEventModal)
