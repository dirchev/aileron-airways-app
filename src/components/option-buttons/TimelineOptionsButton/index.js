import React, { Component } from 'react'
import PropTypes from 'prop-types'
import swal from 'sweetalert2'

class TimelineOptionsButton extends Component {
  constructor () {
    super()
    this.state = {
      opened: false
    }

    this.toggleOpened = this.toggleOpened.bind(this)
    this.deleteTimeline = this.deleteTimeline.bind(this)
    this.createEvent = this.createEvent.bind(this)
  }

  toggleOpened (e) {
    e.preventDefault()
    this.setState({opened: !this.state.opened})
  }

  createEvent (e) {
    e.preventDefault()
    this.props.createEvent()
  }

  deleteTimeline (e) {
    e.preventDefault()
    swal({
      type: 'warning',
      text: 'Are you sure you want to delete this timeline?',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'No, Cancel',
      reverseButtons: true
    })
      .then((result) => {
        if (!result.value) return
        this.props.deleteTimeline()
      })
      .catch(swal.noop)
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
        <button className="button" onClick={this.createEvent}>Create Event</button>
        <button className="button" onClick={this.deleteTimeline}>Delete</button>
      </div>
    )
  }
}

TimelineOptionsButton.propTypes = {
  createEvent: PropTypes.func.isRequired,
  deleteTimeline: PropTypes.func.isRequired
}

export default TimelineOptionsButton
