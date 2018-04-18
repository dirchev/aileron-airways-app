import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Navigation from '../components/Navigation'
import TimelineRegister from '../components/TimelineRegister'
import TimelinesSearchList from '../components/TimelinesSearchList'
import TimelineSearch from '../components/TimelineSearch'
import HomeOptionsButton from '../components/option-buttons/HomeOptionsButton'

import timelineActions from '../action-creators/timeline'
import uiActions from '../action-creators/ui'
import { connect } from 'react-redux'
import _ from 'lodash'

export class HomePage extends Component {
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

  componentDidMount () {
    this.props.fetchAll()
  }

  render() {
    return (
      <div>
        <Navigation {...this.getNavigationItems()}/>
        <div className="section mt-lg">
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
              <TimelineRegister />
            )
          }
        </div>
        <HomeOptionsButton
          createTimeline={this.props.createTimeline}
        />
      </div>
    )
  }
}

HomePage.propTypes = {
  timelines: PropTypes.arrayOf(PropTypes.shape({
    Id: PropTypes.string.isRequired
  })).isRequired,
  hasFiltersApplied: PropTypes.bool.isRequired,
  fetchAll: PropTypes.func.isRequired
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
    },
    createTimeline: () => {
      dispatch(uiActions.openModal('createTimeline', {}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
