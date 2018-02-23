import React, { Component } from 'react'

class EditEventButton extends Component {
  showEditEventModal () {
    alert('not implemented')
  }

  render() {
    return (
      <a className="navbar-item" onClick={this.showEditEventModal} key="create-event-button">
        <i className="fa fa-edit mr-sm"></i>
        Edit Event
      </a>
    )
  }
}

export default EditEventButton
