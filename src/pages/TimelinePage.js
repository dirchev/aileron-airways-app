import React, { Component } from 'react'

import _ from 'lodash'
import { connect } from 'react-redux'
import moment from 'moment'
import { Link, Redirect } from 'react-router-dom'
import eventActions from '../action-creators/event'

import Navigation from '../components/Navigation'
import EventSearchInput from '../components/nav-items/EventSearchInput'
import EditTimelineButton from '../components/nav-items/EditTimelineButton'
import CreateEventButton from '../components/nav-items/CreateEventButton'
import EventsList from '../components/EventsList'

class TimelinePage extends Component {
  getNavigationItems () {
    var backButton = (
      <Link to='/' className="navbar-item" href="" key="back-button">
        <i className="fa fa-chevron-left mr-sm"></i>
        Back
      </Link>
    )

    return {
      actionsLeft: [backButton],
      actionsRight: [
        <EventSearchInput key="event-search" />,
        <EditTimelineButton key="edit-timeline" />,
        <CreateEventButton key="create-event" timeline={this.props.timeline}/>
      ]
    }
  }

  componentWillMount () {
    this.props.fetchEvents()
  }

  render() {
    if (!this.props.timeline) {
      return (<Redirect to="/"/>)
    }
    return (
      <div className="mb-lg">
        <Navigation {...this.getNavigationItems()}/>
        <div className="container">
          <div className="hero">
            <div className="hero-body">
              <div className="title">
                <h1>{this.props.timeline.Title}</h1>
              </div>
              <div className="subtitle">
                <p>{moment(this.props.timeline.CreationTimeStamp).fromNow()}</p>
              </div>
            </div>
          </div>
          <EventsList events={this.props.timeline.events} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  var timeline = state.timelines[ownProps.match.params.Id]
  if (!timeline) return {timeline}
  timeline = {
    ...timeline,
    events: _.chain(timeline.events)
             .map((eventId) => state.events[eventId])
             .sortBy(
               (e) => e.EventDateTime
                ? moment(e.EventDateTime).toISOString()
                : moment(e.CreationTimeStamp).toISOString()
             )
            .reverse()
            .value()
  }
  return {
    timeline: timeline
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchEvents: () => {
      dispatch(eventActions.fetchForTimeline(ownProps.match.params.Id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelinePage)
