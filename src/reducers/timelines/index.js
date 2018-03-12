const defaultState = {}

export default function timelinesReducer (state = defaultState, action) {
  switch(action.type) {
    case 'START_CREATE_TIMELINE':
      return {
        ...state,
        [action.data.Id]: {
          ...action.data,
          events: [],
          loading: true,
          synced: false
        }
      }
    case 'SUCCESS_CREATE_TIMELINE':
      return {
        ...state,
        [action.data.Id]: {
          ...action.data,
          events: [],
          loading: false,
          synced: true
        }
      }
    case 'ERROR_CREATE_TIMELINE':
      return {
        ...state,
        [action.data.Id]: {
          ...state[action.data.Id],
          events: [],
          loading: false,
          synced: false,
          error: action.error
        }
      }
    case 'SUCCESS_FETCH_TIMELINES':
      var newState = {}
      action.data.forEach(function (timeline) {
        newState[timeline.Id] = {events: [], loading: false, synced: true, ...timeline}
      })
      return {
        ...state,
        ...newState,
      }
    case 'START_CREATE_EVENT':
      return {
        ...state,
        [action.data.TimelineId]: {
          ...state[action.data.TimelineId],
          events: [
            ...(state[action.data.TimelineId].events || []),
            action.data.Id
          ]
        }
      }
    case 'SUCCESS_FETCH_EVENTS':
      return {
        ...state,
        [action.data.TimelineId]: {
          ...state[action.data.TimelineId],
          events: action.data.events.map((e) => e.Id)
        }
      }
    default:
      return state
  }
}
