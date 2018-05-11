import _ from 'lodash'
const defaultState = {}

/**
 * Upsert Attachment
 * Adds new attachment to the state or overrides currently existing one.
 * The comparison is made by `attachmentData.Id` matching a key from the `state` object
 *
 * @param {Object} state current redux state
 * @param {Object} attachmentData attachment to be added/edited
 * @returns {Object} new version of the state
 */
const upsertAttachment = function (state, attachmentData) {
  return {
    ...state,
    [attachmentData.Id]: {
      ...state[attachmentData.Id],
      ...attachmentData
    }
  }
}

/**
 * Remove Attachment
 * Removes an attachment from the state if exists.
 * The comparison is made by `attachmentData.Id` matching a key from the `state` object
 *
 * @param {Object} state current redux state
 * @param {Object} attachmentData attachment to be removed
 * @returns {Object} new version of the state
 */
const removeAttachment = function (state, attachmentData) {
  return _.omit(state, attachmentData.Id)
}

/**
 * Upsert Attachments
 * Goes through every attachment in the attachments array and upserts it to the state, using the
 * upsertAttachment logic.
 *
 * @param {Object} state current redux state
 * @param {Object} attachmentsArr attachments to be upserted
 * @returns {Object} new version of the state
 */
const upsertAttachments = function (state, attachmentsArr) {
  return attachmentsArr.reduce(upsertAttachment, state)
}


export default function eventLinksReducer(state = defaultState, action) {
  switch (action.type) {
    case 'SUCCESS_GET_EVENT_ATTACHMENTS':
      return upsertAttachments(
        state,
        action.data.attachments.map((attachment) => ({
          ...attachment,
          loading: false,
          synced: true
        }))
      )
    case 'START_CREATE_ATTACHMENT':
      return upsertAttachment(state, {
        ...action.data,
        loading: true,
        synced: false
      })
    case 'SYNC_ATTACHMENT':
    case 'SUCCESS_CREATE_ATTACHMENT':
      return upsertAttachment(state, {
        ...action.data,
        loading: false,
        synced: true
      })
    case 'ERROR_CREATE_ATTACHMENT':
    case 'ERROR_DELETE_ATTACHMENT':
      return upsertAttachment(state, {
        ...action.data,
        loading: false,
        synced: false,
        error: action.error
      })
    case 'SUCCESS_DELETE_ATTACHMENT':
      return removeAttachment(state, action.data)
    default:
      return state
  }
}
