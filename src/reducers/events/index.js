import _ from 'lodash'
const defaultState = {}

export default function eventsReducer (state = defaultState, action) {
  switch(action.type) {
    case 'START_CREATE_EVENT':
      return {
        ...state,
        [action.data.Id]: {
          ...action.data,
          loading: true,
          synced: false
        }
      }
    case 'START_EDIT_EVENT_TITLE':
      return {
        ...state,
        [action.data.Id]: {
          ...action.data,
          loading: true,
          synced: false
        }
      }
      case 'START_EDIT_EVENT_DESCRIPTION':
      return {
        ...state,
        [action.data.Id]: {
          ...action.data,
          loading: true,
          synced: false
        }
      }
    case 'SUCCESS_CREATE_EVENT':
      return {
        ...state,
        [action.data.Id]: {
          ...action.data,
          loading: false,
          synced: true
        }
      }
      case 'SUCCESS_EDIT_EVENT_TITLE':
      return {
        ...state,
        [action.data.Id]: {
          ...action.data,
          loading: false,
          synced: true
        }
      }
      case 'SUCCESS_EDIT_EVENT_DESCRIPTION':
      return {
        ...state,
        [action.data.Id]: {
          ...action.data,
          loading: false,
          synced: true
        }
      }
    case 'ERROR_EDIT_EVENT_TITLE':
    return {
      ...state,
      [action.data.Id]: {
        ...state[action.data.Id],
        loading: false,
        synced: false,
        error: action.error
      }
    }
    case 'ERROR_EDIT_EVENT_DESCRIPTION':
    return {
      ...state,
      [action.data.Id]: {
        ...state[action.data.Id],
        loading: false,
        synced: false,
        error: action.error
      }
    }
    case 'ERROR_CREATE_EVENT':
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
        newEvents[event.Id] = {loading: false, synced: false, ...event}
      })
      return {
        ...state,
        ...newEvents
      }

    case 'START_DELETE_EVENT':
      return {
        [action.data.Id]: {
          ...state[action.data.Id],
          loading: true,
          synced: false
        }
      }

    case 'ERROR_DELETE_EVENT':
      return {
        [action.data.Id]: {
          ...state[action.data.Id],
          loading: false,
          synced: true,
          error: action.error
        }
      }

    case 'SUCCESS_DELETE_EVENT':
      return _.omit(state, action.data.Id)

    default:
      return state
  }
}
