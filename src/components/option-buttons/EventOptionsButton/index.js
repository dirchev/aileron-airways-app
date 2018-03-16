import React, { Component } from 'react'

class EventOptionsButton extends Component {
  constructor () {
    super()
    this.state = {
      opened: false
    }

    this.toggleOpened = this.toggleOpened.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)
    this.linkEvent = this.linkEvent.bind(this)
    this.attachFile = this.attachFile.bind(this)
  }

  toggleOpened (e) {
    e.preventDefault()
    this.setState({opened: !this.state.opened})
  }

  attachFile (e) {
    e.preventDefault()
    alert('not implemented')
  }

  linkEvent (e) {
    e.preventDefault()
    alert('not implemented')
  }

  deleteEvent (e) {
    e.preventDefault()
    this.props.deleteEvent(this.props.event.Id, this.props.event.TimelineId)
  }

  render() {
    return (
      <div className="page-options">
        {this.state.opened ? this.renderItems() : null}
        <button className="button is-medium is-danger is-circle" onClick={this.toggleOpened}>
          {
            this.state.opened
            ? (<i className="fa fa-times"></i>)
            : (<i className="fa fa-bars"></i>)
          }
        </button>
      </div>
    )
  }

  renderItems () {
    return (
      <div className="items">
        <button className="button" onClick={this.attachFile}>Attach a file</button>
        <button className="button" onClick={this.linkEvent}>Link event</button>
        <button className="button" onClick={this.deleteEvent}>Delete</button>
      </div>
    )
  }
}

export default EventOptionsButton
