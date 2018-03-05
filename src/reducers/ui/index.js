const defaultState = {
  timelinesFilter: null,
  modal: null
}

export default function uiReducer (state = defaultState, action) {
  switch(action.type) {
    case 'SET_TIMELINES_FILTER':
      return {
        ...state,
        timelinesFilter: action.data
      }
    case 'OPEN_MODAL':
      return {
        ...state,
        modal: action.data
      }
    default:
      return state
  }
}
