import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import attachmentActions from '../../action-creators/attachment.js'

import AttachmentItem from './AttachmentItem'

export class EventAttachments extends Component {
  componentDidMount () {
    this.props.getAttachments()
  }

  handleDeleteAttachment (attachmentId) {
    return () => {
      this.props.deleteAttachment(attachmentId)
    }
  }

  render () {
    if (this.props.event.loadingAttachments) {
      return (
        <div className="notification mt-md">
          <span className="icon"><i className="fa fa-spinner fa-spin"></i></span>
          <span>Loading event attachments...</span>
        </div>
      )
    } else if (!this.props.attachments.length) {
      return (
        <div className="notification is-info mt-md">
          <span>There are no attachments for this event.</span>
        </div>
      )
    }
    return (
      <div className="mt-md columns is-multiline">
        {
          this.props.attachments.map((attachment) => {
            return (
              <div key={attachment.Id} className="column is-one-quarter-desktop">
                <AttachmentItem attachment={attachment} deleteAttachment={this.handleDeleteAttachment(attachment.Id)}/>
              </div>
            )
          })
        }
      </div>
    )
  }
}

EventAttachments.propTypes = {
  event: PropTypes.shape({
    Id: PropTypes.string.isRequired
  }).isRequired,
  attachments: PropTypes.array.isRequired,
  deleteAttachment: PropTypes.func.isRequired,
  getAttachments: PropTypes.func.isRequired
}

var mapStateToProps = function (state, oldProps) {
  var attachments = _.chain(state.attachments).values().filter({TimelineEventId: oldProps.event.Id}).value()
  return {
    attachments: attachments
  }
}

var mapDispatchToProps = function (dispatch, oldProps) {
  return {
    getAttachments: function () {
      dispatch(attachmentActions.getAttachmentsForEvent(oldProps.event.Id))
    },
    deleteAttachment: function (attachmentId) {
      dispatch(attachmentActions.delete(attachmentId))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EventAttachments)
