import uuid from 'uuid'
import SDK from '../timeline-sdk'
import actions from './actions.js'
import { push } from '../p2p-connection'

export default {
  create: function (attachmentData) {
    var assignedId = uuid.v4()

    return function (dispatch) {
      dispatch({
        type: actions.attachment.START_CREATE_ATTACHMENT,
        data: { Id: assignedId, ...attachmentData }
      })

      SDK.Attachments.create({ AttachmentId: assignedId, ...attachmentData })
        .then(() => {
          return SDK.Attachments.generateUploadLink(assignedId)
        })
        .then((uploadURL) => {
          return SDK.Attachments.upload(uploadURL.result, attachmentData.file)
        })
        .then(() => {
          return SDK.Attachments.generateGetLink(assignedId)
        })
        .then((getURL) => {
          attachmentData.getURL = getURL.result
          var action = {
            type: actions.attachment.SUCCESS_CREATE_ATTACHMENT,
            data: { Id: assignedId, ...attachmentData }
          }
          dispatch(action)
          push(action)
        })
        .catch((error) => {
          dispatch({
            type: actions.attachment.ERROR_CREATE_ATTACHMENT,
            data: { Id: assignedId, ...attachmentData },
            error: error
          })
        })
    }
  },
  getAttachmentsForEvent: function (eventId) {
    return function (dispatch) {
      dispatch({
        type: actions.attachment.START_GET_EVENT_ATTACHMENTS,
        data: {EventId: eventId}
      })
      SDK.TimelineEvents.getAttachments(eventId)
        .then((attachments) => {
          var requests = attachments.map(function (attachment) {
            return SDK.Attachments.generateGetLink(attachment.Id).then(function (link) {
              return {
                ...attachment,
                getURL: link.result
              }
            })
          })
          return Promise.all(requests)
        })
        .then((result) => {
          dispatch({
            type: actions.attachment.SUCCESS_GET_EVENT_ATTACHMENTS,
            data: { EventId: eventId, attachments: result }
          })
        })
        .catch((error) => {
          dispatch({
            type: actions.attachment.ERROR_GET_EVENT_ATTACHMENTS,
            data: { EventId: eventId },
            error: error
          })
        })
    }
  },
  delete: function (attachmentId) {
    return function (dispatch) {
      dispatch({
        type: actions.attachment.START_DELETE_ATTACHMENT,
        data: {Id: attachmentId}
      })
      SDK.Attachments.delete(attachmentId)
        .then((result) => {
          var action = {
            type: actions.attachment.SUCCESS_DELETE_ATTACHMENT,
            data: {Id: attachmentId}
          }
          dispatch(action)
          push(action)
        })
        .catch((error) => {
          dispatch({
            type: actions.attachment.ERROR_DELETE_ATTACHMENT,
            data: { Id: attachmentId },
            error: error
          })
        })
    }
  },
}
