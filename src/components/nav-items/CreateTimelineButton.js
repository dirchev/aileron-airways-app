import React, { Component } from 'react'

class CreateTimelineButton extends Component {
  showEditTimelineModal () {
    alert('not implemented')
  }

  render() {
    return (
      <a className="navbar-item" onClick={this.showEditTimelineModal} key="create-event-button">
        <i className="fa fa-plus mr-sm"></i>
        Create Timeline
      </a>
    )
  }
}

export default CreateTimelineButton
