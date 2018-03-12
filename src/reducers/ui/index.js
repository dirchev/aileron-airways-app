const defaultState = {
  timelinesFilter: null,
  modal: null,
  modalProps: null
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
        modal: action.data,
        modalProps: action.props
      }
    default:
      return state
  }
}
