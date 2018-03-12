import React, { Component } from 'react'
import { connect } from 'react-redux'

import uiActions from '../../action-creators/ui'

class CreateEventButton extends Component {
  render() {
    return (
      <a className="navbar-item" onClick={this.props.openModal} key="create-event-button">
        <i className="fa fa-plus mr-sm"></i>
        Create Event
      </a>
    )
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    openModal: () => {
      dispatch(uiActions.openModal('createEvent', {timelineId: ownProps.timeline.Id}))
    }
  }
}

export default connect(null, mapDispatchToProps)(CreateEventButton)
