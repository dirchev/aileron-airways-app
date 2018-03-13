import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
import timelineActions from '../../action-creators/timeline'
import eventActions from '../../action-creators/event'

import { Link, Redirect } from 'react-router-dom'
import Navigation from '../../components/Navigation'
import CreateEventButton from '../../components/nav-items/CreateEventButton'
import TimelineHeading from './TimelineHeading'
import EventsList from '../../components/EventsList'
import TimelineOptionsButton from '../../components/option-buttons/TimelineOptionsButton'

class TimelinePage extends Component {
  constructor () {
    super()
    this.handleTitleChange = this.handleTitleChange.bind(this)
  }

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
        <CreateEventButton timeline={this.props.timeline} key="create-event"/>
      ]
    }
  }

  componentWillMount () {
    this.props.fetchEvents()
  }

  handleTitleChange (newTitle) {
    this.props.changeTimelineTitle({
      ...this.props.timeline,
      Title: newTitle
    })
  }

  render() {
    if (!this.props.timeline) {
      return (<Redirect to="/"/>)
    }
    return (
      <div>
        <Navigation {...this.getNavigationItems()}/>
        <div className="container">
          <TimelineHeading
            onTitleChange={this.handleTitleChange}
            timeline={this.props.timeline}/>
          <EventsList events={this.props.timeline.events} />
        </div>
        <TimelineOptionsButton deleteTimeline={this.props.deleteTimeline}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  var timeline = state.timelines[ownProps.match.params.Id]
  if (!timeline) return {timeline}
  timeline = {
    ...timeline,
    events: _.chain(state.events)
             .values()
             .filter((event) => event.TimelineId === ownProps.match.params.Id)
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
    changeTimelineTitle: function (timelineData) {
      dispatch(timelineActions.edit(timelineData))
    },
    deleteTimeline: () => {
      dispatch(timelineActions.delete(ownProps.match.params.Id))
    },
    fetchEvents: () => {
      dispatch(eventActions.fetchForTimeline(ownProps.match.params.Id))
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TimelinePage)
