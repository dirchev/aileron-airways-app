import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
import timelineActions from '../../action-creators/timeline'
import eventActions from '../../action-creators/event'
import uiActions from '../../action-creators/ui'

import { Link, Redirect } from 'react-router-dom'
import Navigation from '../../components/Navigation'
import TimelineHeading from './TimelineHeading'
import TimelineEvents from './TimelineEvents'
import TimelineOptionsButton from '../../components/option-buttons/TimelineOptionsButton'

export class TimelinePage extends Component {
  constructor () {
    super()
    this.handleTitleChange = this.handleTitleChange.bind(this)
  }

  getNavigationItems () {
    var homeButton = (
      <Link to={`/`} className="navbar-item" key="home-button" style={{backgroundColor: '#fff'}}>
        <img src="/logo.png" alt="Aileron Airways" />
      </Link>
    )

    return {
      actions: [homeButton]
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
        <div className="section mt-lg">
          <div className="mb-md">
            <TimelineHeading
              onTitleChange={this.handleTitleChange}
              timeline={this.props.timeline}
            />
          </div>
          {this.renderContent()}
        </div>
        <TimelineOptionsButton
          deleteTimeline={this.props.deleteTimeline}
          createEvent={this.props.createEvent}
        />
      </div>
    )
  }

  renderContent () {
    if (this.props.timeline.loadingEvents) {
      return (
        <div className="notification">
          <span className="icon"><i className="fa fa-spinner fa-spin"></i></span>
          <span>Loading timeline events...</span>
        </div>
      )
    } else {
      return (<TimelineEvents timeline={this.props.timeline} />)
    }
  }
}

TimelinePage.propTypes = {
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
  }),
  changeTimelineTitle: PropTypes.func.isRequired,
  deleteTimeline: PropTypes.func.isRequired,
  fetchEvents: PropTypes.func.isRequired,
  createEvent: PropTypes.func.isRequired
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
    createEvent: () => {
      dispatch(uiActions.openModal('createEvent', {timelineId: ownProps.match.params.Id}))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TimelinePage)
