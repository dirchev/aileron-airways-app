import React, { Component } from 'react'

class CreateEventButton extends Component {
  showEditEventModal () {
    alert('not implemented')
  }

  render() {
    return (
      <a className="navbar-item" onClick={this.showEditEventModal} key="create-event-button">
        <i className="fa fa-plus mr-sm"></i>
        Create Event
      </a>
    )
  }
}

export default CreateEventButton
