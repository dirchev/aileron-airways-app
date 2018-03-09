import React, { Component } from 'react'

import { connect } from 'react-redux'
import timelineActions from '../../action-creators/timeline'

import { Link, Redirect } from 'react-router-dom'
import Navigation from '../../components/Navigation'
import CreateEventButton from '../../components/nav-items/CreateEventButton'
import TimelineHeading from './TimelineHeading'

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
        <CreateEventButton key="create-event"/>
      ]
    }
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
        <TimelineHeading
          onTitleChange={this.handleTitleChange}
          timeline={this.props.timeline}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    timeline: state.timelines[ownProps.match.params.Id]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeTimelineTitle: function (timelineData) {
      dispatch(timelineActions.edit(timelineData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelinePage)
