import _ from 'lodash'
const defaultState = []

// This reducer keeps track of the event links
// THE STATE IS AN ARRAY, and contains objects like {TimelineEventId: '1', LinkedToTimelineEventId: '2'}
export default function eventLinksReducer(state = defaultState, action) {
  switch (action.type) {
    case 'START_LINK_EVENT':
      return [
        ...state,
        {
          TimelineEventId: action.data.TimelineEventId,
          LinkedToTimelineEventId: action.data.LinkedToTimelineEventId,
          loading: true,
          synced: false
        }
      ]
    case 'SYNC_EVENTLINK':
    case 'SUCCESS_LINK_EVENT':
      return state.map(function (link) {
        // if this is not the particular link - do not change
        if (link.TimelineEventId !== action.data.TimelineEventId
            || link.LinkedToTimelineEventId !== action.data.LinkedToTimelineEventId)
          return link

        // this is the particular link, update
        return {
          ...action.data,
          loading: false,
          synced: true
        }
      })
    case 'START_UNLINK_EVENT':
      return state.map(function (link) {
        // if this is not the particular link - do not change
        if (link.TimelineEventId !== action.data.TimelineEventId
            || link.LinkedToTimelineEventId !== action.data.LinkedToTimelineEventId)
          return link

        // this is the particular link, update
        return {
          ...action.data,
          loading: true,
          synced: false
        }
      })
    case 'SUCCESS_UNLINK_EVENT':
      return state.filter(function (link) {
        return !(link.TimelineEventId === action.data.TimelineEventId
                && link.LinkedToTimelineEventId === action.data.LinkedToTimelineEventId)
      })
    case 'ERROR_LINK_EVENT':
    case 'ERROR_UNLINK_EVENT':
      return state.map(function (link) {
        // if this is not the particular link - do not change
        if (link.TimelineEventId !== action.data.TimelineEventId
            || link.LinkedToTimelineEventId !== action.data.LinkedToTimelineEventId)
          return link

        // this is the particular link, update
        return {
          ...link,
          loading: false,
          synced: false,
          error: action.error
        }
      })

    case 'SUCCESS_GET_LINKED_EVENTS':
    return _.uniqBy([...state, ...action.data], 'Id')

    default:
      return state
  }
}
