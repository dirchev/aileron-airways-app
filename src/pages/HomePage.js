import React, { Component } from 'react'
import Navigation from '../components/Navigation'
import TimelinesList from '../components/TimelinesList'
import TimelinesSearchList from '../components/TimelinesSearchList'
import TimelineCreateButton from '../components/nav-items/CreateTimelineButton'
import TimelineSearch from '../components/TimelineSearch'

import timelineActions from '../action-creators/timeline'
import { connect } from 'react-redux'
import _ from 'lodash'

class HomePage extends Component {
  getNavigationItems () {
    return {
      actionsRight: [
        <TimelineCreateButton key="timeline-create"/>
      ]
    }
  }

  componentDidMount () {
    this.props.fetchAll()
  }

  render() {
    return (
      <div>
        <Navigation {...this.getNavigationItems()}/>
        <div className="section">
          <div className="mb-md">
            <div className="title">
              <h1>Timelines</h1>
            </div>
            <div className="subtitle">
              <p>{this.props.timelines.length} total timelines</p>
            </div>
          </div>
          <div className="mb-lg">
            <TimelineSearch />
          </div>
          {
            this.props.hasFiltersApplied
            ? (
              <TimelinesSearchList />
            )
            : (
              <TimelinesList />
            )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    timelines: _.chain(state.timelines).values().value(), // get array of timelines
    hasFiltersApplied: !!state.ui.timelinesFilter // indicate if there is a filter
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    fetchAll: () => {
      dispatch(timelineActions.fetchAll())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
