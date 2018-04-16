const defaultState = {
  timelinesFilter: null,
  modal: null,
  modalProps: null,
  globalLoading: true
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
    default:
      return state
  }
}
