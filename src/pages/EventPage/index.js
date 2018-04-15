import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import eventActions from '../../action-creators/event'

import EventAttachments from '../../components/EventAttachments'
import EventOptionsButton from '../../components/option-buttons/EventOptionsButton'
import Navigation from '../../components/Navigation'
import EventBox from './EventBox'
import LinkedEventsMap from './LinkedEventsMap'

export class EventPage extends Component {
  constructor(props) {
    super(props)
    if (props.event) {
      // record the timeline id
      // we will use it when the event is deleted
      this.timelineId = props.event.TimelineId
    }
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
  }

  getNavigationItems() {
    var backButton = (
      <Link to={this.timelineId ? `/timeline/${this.timelineId}` : '/'}
        className="navbar-item"
        href=""
        key="back-button">
        <i className="fa fa-chevron-left mr-sm"></i>
        Back
      </Link>
    )

    return {
      actionsLeft: [backButton],
    }
  }

  handleTitleChange(newTitle) {
    this.props.changeEventTitle({
      ...this.props.event,
      Title: newTitle
    })
  }

  handleDescriptionChange(newDescription) {
    this.props.changeEventDescription({
      ...this.props.event,
      Description: newDescription
    })
  }

  handleLocationChange(newLocation) {
    this.props.changeEventLocation({
      ...this.props.event,
      Location: newLocation
    })
  }

  render() {
    if (!this.props.event) {
      return (<Redirect to={this.timelineId ? `/timeline/${this.timelineId}` : '/'} />)
    }
    return (
      <div className="mb-lg">
        <Navigation {...this.getNavigationItems()} />
        <EventOptionsButton event={this.props.event} deleteEvent={this.props.deleteEvent} />
        <div className="section">
          <div className="columns">
            <div className="column is-one-quarter">
              <LinkedEventsMap event={this.props.event} />
            </div>
            <div className="column">
              <EventBox
                event={this.props.event}
                handleTitleChange={this.handleTitleChange}
                handleDescriptionChange={this.handleDescriptionChange}
                handleLocationChange={this.handleLocationChange}
              />
              <EventAttachments event={this.props.event} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EventPage.propTypes = {
  event: PropTypes.shape({
    Id: PropTypes.string.isRequired,
    TimelineId: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Location: PropTypes.string.isRequired,
    EventDateTime: PropTypes.string.isRequired,
  }),
  changeEventTitle: PropTypes.func.isRequired,
  changeEventDescription: PropTypes.func.isRequired,
  changeEventLocation: PropTypes.func.isRequired,
  /* changeEventDateTime: PropTypes.func.isRequired,*/
  deleteEvent: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    event: state.events[ownProps.match.params.Id]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeEventTitle: function (eventData) {
      dispatch(eventActions.editTitle(eventData))
    },
    changeEventDescription: function (eventData) {
      dispatch(eventActions.editDescription(eventData))
    },
    changeEventLocation: function (eventData) {
      dispatch(eventActions.editLocation(eventData))
    },
    deleteEvent: (eventId, timelineId) => {
      dispatch(eventActions.delete(eventId, timelineId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPage)
