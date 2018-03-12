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
    case 'SUCCESS_CREATE_EVENT':
      return {
        ...state,
        [action.data.Id]: {
          ...action.data,
          loading: false,
          synced: true
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
    default:
      return state
  }
}
