import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uiActions from '../../../action-creators/ui'
import swal from 'sweetalert2'

export class EventOptionsButton extends Component {
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
    this.props.openModal('createAttachment', {
      EventId: this.props.event.Id
    })
  }

  linkEvent (e) {
    e.preventDefault()
    this.props.openModal('linkEvent', {
      EventId: this.props.event.Id,
      TimelineId: this.props.event.TimelineId
    })
  }

  deleteEvent (e) {
    e.preventDefault()
    swal({
      type: 'warning',
      text: 'Are you sure you want to delete this event?',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'No, Cancel',
      reverseButtons: true
    })
      .then((result) => {
        if (!result.value) return
        this.props.deleteEvent(this.props.event.Id, this.props.event.TimelineId)
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
        <button className="button" onClick={this.attachFile}>Attach a file</button>
        <button className="button" onClick={this.linkEvent}>Link event</button>
        <button className="button" onClick={this.deleteEvent}>Delete</button>
      </div>
    )
  }
}

EventOptionsButton.propTypes = {
  event: PropTypes.shape({
    Id: PropTypes.string.isRequired,
    TimelineId: PropTypes.string.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    openModal: (name, props) => {
      dispatch(uiActions.openModal(name, props))
    }
  }
}

export default connect(null, mapDispatchToProps)(EventOptionsButton)
