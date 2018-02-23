import React, { Component } from 'react'

class EditTimelineButton extends Component {
  showEditTimelineModal () {
    alert('not implemented')
  }

  render() {
    return (
      <a className="navbar-item" onClick={this.showEditTimelineModal} key="create-event-button">
        <i className="fa fa-edit mr-sm"></i>
        Edit Timeline
      </a>
    )
  }
}

export default EditTimelineButton
