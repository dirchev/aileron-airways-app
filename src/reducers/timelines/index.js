const defaultState = {}

/*
  Timeline Reducer
  Contains reducers related to timelines
 */
export default function timelinesReducer (state = defaultState, action) {
  switch(action.type) {
    // For the given timeline:
    // - set data
    // - set synced to false
    // - save loading to true
    case 'START_CREATE_TIMELINE':
      return {
        ...state,
        [action.data.Id]: {
            ...action.data,
            loading: true,
            synced: false
        }
      }

    // For the given timeline:
    // - set add new data from server
    // - set synced to true
    // - save loading to false
    case 'SUCCESS_CREATE_TIMELINE':
      return {
        ...state,
        [action.data.Id]: {
            ...action.data,
            loading: false,
            synced: true
        }
      }

    // For the given timeline:
    // - set loading to false
    // - set synced to false
    // - save error message
    case 'ERROR_CREATE_TIMELINE':
      return {
        ...state,
        [action.data.Id]: {
            ...state[action.data.Id],
            loading: false,
            synced: false,
            error: action.error
        }
      }
    case 'SUCCESS_FETCH_TIMELINES':
      var newState = {}
      action.data.forEach(function (timeline) {
        newState[timeline.Id] = {synced: true, ...timeline}
      })
      return {
        ...state,
        ...newState,
      }
    default:
      return state
  }
}
