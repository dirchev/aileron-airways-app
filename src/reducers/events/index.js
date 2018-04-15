import _ from 'lodash'
const defaultState = {}

export default function eventsReducer(state = defaultState, action) {
  switch (action.type) {
    case 'START_CREATE_EVENT':
    case 'START_EDIT_EVENT_TITLE':
    case 'START_EDIT_EVENT_DESCRIPTION':
    case 'START_EDIT_EVENT_LOCATION':
    case 'START_DELETE_EVENT':
      return {
        ...state,
        [action.data.Id]: {
          ...action.data,
          loading: true,
          synced: false
        }
      }
    case 'SUCCESS_CREATE_EVENT':
    case 'SUCCESS_EDIT_EVENT_TITLE':
    case 'SUCCESS_EDIT_EVENT_DESCRIPTION':
    case 'SUCCESS_EDIT_EVENT_LOCATION':
    case 'SYNC_EVENT':
      return {
        ...state,
        [action.data.Id]: {
          ...action.data,
          loading: false,
          synced: true
        }
      }
    case 'ERROR_EDIT_EVENT_TITLE':
    case 'ERROR_EDIT_EVENT_DESCRIPTION':
    case 'ERROR_EDIT_EVENT_LOCATION':
    case 'ERROR_CREATE_EVENT':
    case 'ERROR_DELETE_EVENT':
      return {
        ...state,
        [action.data.Id]: {
          ...state[action.data.Id],
          loading: false,
          synced: false,
          error: action.error
        }
      }
    case 'SUCCESS_FETCH_EVENTS':
      var newEvents = {}
      action.data.events.forEach(function (event) {
        newEvents[event.Id] = { ...event, loading: false, synced: true }
      })
      return {
        ...state,
        ...newEvents
      }

    case 'SUCCESS_DELETE_EVENT':
      return _.omit(state, action.data.Id)

    default:
      return state
  }
}
