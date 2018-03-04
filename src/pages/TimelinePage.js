import React, { Component } from 'react'

import { connect } from 'react-redux'
import moment from 'moment'

import { Link, Redirect } from 'react-router-dom'
import Navigation from '../components/Navigation'
import EventSearchInput from '../components/nav-items/EventSearchInput'
import EditTimelineButton from '../components/nav-items/EditTimelineButton'
import CreateEventButton from '../components/nav-items/CreateEventButton'

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
        <CreateEventButton key="create-event"/>
      ]
    }
  }

  render() {
    // TODO load timetable if it is not loaded and redirect only if it does not exist in DB
    // check if the timelines is not loaded
    if (!this.props.timeline) {
      return (<Redirect to="/"/>)
    }
    return (
      <div>
        <Navigation {...this.getNavigationItems()}/>
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
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    timeline: state.timelines[ownProps.match.params.Id]
  }
}

export default connect(mapStateToProps)(TimelinePage)
