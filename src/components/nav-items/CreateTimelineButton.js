import React, { Component } from 'react'
import { connect } from 'react-redux'

import uiActions from '../../action-creators/ui'

class CreateTimelineButton extends Component {
  constructor () {
    super()
  }

  render() {
    return (
      <a className="navbar-item" onClick={this.props.openModal} key="create-event-button">
        <i className="fa fa-plus mr-sm"></i>
        Create Timeline
      </a>
    )
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    openModal: () => {
      dispatch(uiActions.openModal('createTimeline'))
    }
  }
}

export default connect(null, mapDispatchToProps)(CreateTimelineButton)
