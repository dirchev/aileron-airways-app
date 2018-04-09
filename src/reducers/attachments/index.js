import _ from 'lodash'
const defaultState = {}

// This reducer keeps track of the event attachments
// THE STATE IS AN OBJECT, and contains objects like
// {
//   '2': {
//     TimelineEventId: '1',
//     Id: '2'
//     Title: 'Title',
//     getURL: ''
//   }
// }
export default function eventLinksReducer(state = defaultState, action) {
  switch (action.type) {
    case 'SUCCESS_GET_EVENT_ATTACHMENTS':
      var attachmentsObject = []
      action.data.attachments.forEach(function (attachment) {
        attachmentsObject[attachment.Id] = {
          ...attachment,
          loading: false,
          synced: true
        }
      })
      return {
        ...state,
        ...attachmentsObject
      }
    case 'START_CREATE_ATTACHMENT':
      return {
        ...state,
        [action.data.Id]: {
          ...action.data,
          loading: true,
          synced: false
        }
      }
    case 'SUCCESS_CREATE_ATTACHMENT':
      return {
        ...state,
        [action.data.Id]: {
          ...action.data,
          loading: false,
          synced: true
        }
      }
    case 'ERROR_CREATE_ATTACHMENT':
    case 'ERROR_DELETE_ATTACHMENT':
      return {
        ...state,
        [action.data.Id]: {
          ...action.data,
          loading: false,
          synced: false,
          error: action.error
        }
      }
    case 'SUCCESS_DELETE_ATTACHMENT':
      return _.omit(state, action.data.Id)
    default:
      return state
  }
}
