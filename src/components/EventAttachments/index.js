import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import attachmentActions from '../../action-creators/attachment.js'

import AttachmentItem from './AttachmentItem'

class EventAttachments extends Component {
  componentDidMount () {
    this.props.getAttachments()
  }

  handleDeleteAttachment (attachmentId) {
    return () => {
      this.props.deleteAttachment(attachmentId)
    }
  }

  render () {
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
