import _ from 'lodash'

const defaultState = {
  timelinesFilter: null,
  modal: null,
  modalProps: null,
  globalLoading: false,
  notworkIsOffline: false,
  syncConflicts: []
}

export default function uiReducer (state = defaultState, action) {
  switch(action.type) {
    case 'SET_TIMELINES_FILTER':
      return {
        ...state,
        timelinesFilter: action.data
      }
    case 'GLOBAL_LOADING':
      return {
        ...state,
        globalLoading: action.value
      }
    case 'OPEN_MODAL':
      return {
        ...state,
        modal: action.data,
        modalProps: action.props
      }
    case 'UPDATE_NETWORK_STATUS':
      return {
        ...state,
        networkIsOffline: action.status
      }
    case 'ADD_SYNC_CONFLICT':
      return {
        ...state,
        syncConflicts: [
          ...state.syncConflicts,
          action.data
        ]
      }
    case 'REMOVE_SYNC_CONFLICT':
      return {
        ...state,
        syncConflicts: [
          ...state.syncConflicts,
          _.filter(action.data, {id: action.id})
        ]
      }
    default:
      return state
  }
}
