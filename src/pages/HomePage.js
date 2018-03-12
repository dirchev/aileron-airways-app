import React, { Component } from 'react'
import Navigation from '../components/Navigation'
import TimelinesList from '../components/TimelinesList'
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
        <div className="container">
          <div className="hero">
            <div className="hero-body">
              <div className="title">
                <h1>Timelines</h1>
              </div>
              <div className="subtitle">
                <p>{this.props.timelines.length} timelines available</p>
              </div>
            </div>
          </div>
          <div className="mb-lg">
            <TimelineSearch />
          </div>
          <TimelinesList timelines={this.props.timelines}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    var timelines = _.chain(state.timelines).values()
    if (state.ui.timelinesFilter) {
      timelines = timelines.filter((timeline) => {
        return timeline.Title.toLowerCase().indexOf(state.ui.timelinesFilter.toLowerCase()) !== -1
      })
    }

    timelines = timelines.sortBy('CreatedTimeStamp').reverse().value()
  return {
    timelines: timelines
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
