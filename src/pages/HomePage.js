import React, { Component } from 'react'
import Navigation from '../components/Navigation'
import TimelinesList from '../components/TimelinesList'
import TimelineSearchInput from '../components/nav-items/TimelineSearchInput'
import TimelineCreateButton from '../components/nav-items/CreateTimelineButton'

import timelineActions from '../action-creators/timeline'
import { connect } from 'react-redux'
import _ from 'lodash'

class HomePage extends Component {
  getTimelinesArray () {
    var result = _.chain(this.props.timelines).values()
    if (this.props.timelinesFilter) {
      result = result.filter((timeline) => {
        return timeline.Title.toLowerCase().indexOf(this.props.timelinesFilter.toLowerCase()) !== -1
      })
    }

    result = result.sortBy('CreatedTimeStamp').reverse()

    return result.value()
  }

  getNavigationItems () {
    return {
      actionsRight: [
        <TimelineSearchInput key="timeline-search" />,
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
        <div className="container is-fluid">
          <div className="hero">
            <div className="hero-body">
              <div className="title">
                <h1>Timelines</h1>
              </div>
              <div className="subtitle">
                <p>{this.getTimelinesArray().length} timelines available</p>
              </div>
            </div>
          </div>
          <TimelinesList timelines={this.getTimelinesArray()}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    timelines: state.timelines,
    timelinesFilter: state.ui.timelinesFilter,
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
