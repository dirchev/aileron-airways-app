import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import moment from 'moment'
import swal from 'sweetalert2'

import eventActions from '../../action-creators/event'

export class LinkedEventsMap extends Component {
  constructor () {
    super()
    this.state = {
      editMode: false
    }

    this.toggleEditMode = this.toggleEditMode.bind(this)
    this.unlinkEvent = this.unlinkEvent.bind(this)
  }

  componentDidMount () {
    // load linked events
    this.props.getLinkedEvents()
  }

  unlinkEvent (eventId) {
    return (e) => {
      e.preventDefault()

      swal({
        type: 'warning',
        text: 'Are you sure you want to unlink this event?',
        showCancelButton: true,
        confirmButtonText: 'Yes, Unlink',
        cancelButtonText: 'No, Cancel',
        reverseButtons: true
      })
        .then((result) => {
          if (!result.value) return
          this.props.unlinkEvent(eventId)
        })
        .catch(swal.noop)
    }
  }

  toggleEditMode (e) {
    e.preventDefault()
    this.setState({
      editMode: !this.state.editMode
    })
  }

  render () {
    return (
      <div>
        <div className="level">
          <div className="level-left">
            <div className="title is-size-4">Linked Events</div>
          </div>
          <div className="level-right">
            {
              this.state.editMode
              ? (
                <button onClick={this.toggleEditMode} className="button is-default is-small">
                  <span className="icon is-small">
                    <i className="fa fa-times"></i>
                  </span>
                </button>
              )
              : (
                <button onClick={this.toggleEditMode} className="button is-primary is-small">
                  <span>Edit</span>
                  <span className="icon is-small">
                    <i className="fa fa-edit"></i>
                  </span>
                </button>
              )
            }
          </div>
        </div>
        <div className="timeline">
          {this.renderItems()}
        </div>
      </div>
    )
  }

  renderItems () {
    return this.props.items.map((event) => {
      var isCurrent = event.Id === this.props.event.Id
      var editMode = this.state.editMode
      var timelineMarker
      if (isCurrent) {
        timelineMarker = (<div className="timeline-marker is-primary"></div>)
      } else if (editMode) {
        timelineMarker = (
          <a onClick={this.unlinkEvent(event.Id)} className="timeline-marker is-danger is-icon">
            <i className="fa fa-times"></i>
          </a>
        )
      } else {
        timelineMarker = (<div className="timeline-marker"></div>)
      }

      return (
        <div key={event.Id} className="timeline-item">
          <div className="timeline-content">
            {timelineMarker}
            <p className="heading">
              {moment(event.EventDateTime).format('DD MMM YYYY')}
            </p>
            <Link key={event.Id} to={`/event/${event.Id}`} >
              {event.Title}
            </Link>
          </div>
        </div>
      )
    })
  }
}

LinkedEventsMap.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    Id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
  })).isRequired,
  getLinkedEvents: PropTypes.func.isRequired,
  unlinkEvent: PropTypes.func.isRequired
}

var mapStateToProps = function (state, ownProps) {
  var eventId = ownProps.event.Id
  var links = state.eventLinks.filter(function (link) {
    return link.TimelineEventId === eventId
  }).map(function (link) {
    return state.events[link.LinkedToTimelineEventId]
  }).filter((e) => e) // remove deleted events

  var items = _.chain(links.concat(ownProps.event)).sortBy(function (event) {
    return moment(event.EventDateTime).toISOString()
  }).reverse().value()

  return {
    items
  }
}

var mapDispatchToProps = function (dispatch, ownProps) {
  return {
    getLinkedEvents: function () {
      dispatch(eventActions.getLinkedEvents(ownProps.event.Id))
    },
    unlinkEvent: function (eventToUnlinkId) {
      dispatch(eventActions.unlinkEvent(ownProps.event.Id, eventToUnlinkId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedEventsMap)
