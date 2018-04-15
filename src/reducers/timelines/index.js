import _ from 'lodash'
const defaultState = {}

export default function timelinesReducer (state = defaultState, action) {
  switch(action.type) {
    case 'START_CREATE_TIMELINE':
    case 'START_EDIT_TIMELINE':
    case 'START_DELETE_TIMELINE':
      return {
        ...state,
        [action.data.Id]: {
          ...action.data,
          loading: true,
          synced: false
        }
      }
    case 'SUCCESS_CREATE_TIMELINE':
    case 'SUCCESS_EDIT_TIMELINE':
    case 'SYNC_TIMELINE':
      return {
        ...state,
        [action.data.Id]: {
          ...action.data,
          loading: false,
          synced: true
        }
      }
    case 'ERROR_EDIT_TIMELINE':
    case 'ERROR_CREATE_TIMELINE':
    case 'ERROR_DELETE_TIMELINE':
      return {
        ...state,
        [action.data.Id]: {
          ...state[action.data.Id],
          loading: false,
          synced: false,
          error: action.error
        }
      }
    case 'SUCCESS_DELETE_TIMELINE':
      return _.omit(state, action.data.Id)

    case 'SUCCESS_FETCH_TIMELINES':
      var newState = {}
      action.data.forEach(function (timeline) {
        newState[timeline.Id] = {loading: false, synced: true, ...timeline}
      })
      return {
        ...state,
        ...newState,
      }
    default:
      return state
  }
}
