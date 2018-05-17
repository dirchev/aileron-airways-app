const defaultState = {
  timelinesFilter: null,
  modal: null,
  modalProps: null,
  globalLoading: false
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
    default:
      return state
  }
}
