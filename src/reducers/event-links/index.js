import _ from 'lodash'
const defaultState = []


/**
 * Upsert Event Link
 * Adds new event link to the state if one does not exist.
 *
 * @param {Object} state current redux state
 * @param {Object} eventLinkData event link to be added/edited
 * @returns {Object} new version of the state
 */
const upsertEventLink = function (state, eventLinkData) {
  var found = false
  var result = state.map((eventLink) => {
    if (eventLink.TimelineEventId === eventLinkData.TimelineEventId &&
      eventLink.LinkedToTimelineEventId === eventLinkData.LinkedToTimelineEventId) {
      found = true
      return {
        ...eventLink,
        ...eventLinkData
      }
    } else {
      return eventLink
    }
  })
  if (found) return result
  else return [...result, eventLinkData]
}

/**
 * Remove Event Link
 * Removes an event link from the state if exists.
 *
 * @param {Object} state current redux state
 * @param {Object} eventLinkData event link to be removed
 * @returns {Object} new version of the state
 */
const removeEventLink = function (state, eventLinkData) {
  return _.reject(state, {
    TimelineEventId: eventLinkData.TimelineEventId,
    LinkedToTimelineEventId: eventLinkData.LinkedToTimelineEventId
  })
}

/**
 * Upsert Event Links
 * Goes through every event link in the array and upserts it to the state, using the
 * upsertEventLink logic.
 *
 * @param {Object} state current redux state
 * @param {Object} eventLinksArr event links to be upserted
 * @returns {Object} new version of the state
 */
const upsertEventLinks = function (state, eventLinksArr) {
  return eventLinksArr.reduce(upsertEventLink, state)
}

// This reducer keeps track of the event links
// THE STATE IS AN ARRAY, and contains objects like {TimelineEventId: '1', LinkedToTimelineEventId: '2'}
export default function eventLinksReducer(state = defaultState, action) {
  switch (action.type) {
    case 'START_LINK_EVENT':
      return upsertEventLink(state, {
        TimelineEventId: action.data.TimelineEventId,
        LinkedToTimelineEventId: action.data.LinkedToTimelineEventId,
        loading: true,
        synced: false
      })
    case 'SYNC_EVENTLINK':
    case 'SUCCESS_LINK_EVENT':
      return upsertEventLink(state, {
        ...action.data,
        loading: false,
        synced: true
      })
    case 'START_UNLINK_EVENT':
      return upsertEventLink(state, {
        ...action.data,
        loading: true,
        synced: false
      })
    case 'SUCCESS_UNLINK_EVENT':
      return removeEventLink(state, action.data)
    case 'ERROR_LINK_EVENT':
    case 'ERROR_UNLINK_EVENT':
      return upsertEventLink(state, {
        ...action.data,
        loading: false,
        synced: false,
        error: action.error
      })
    case 'SUCCESS_GET_LINKED_EVENTS':
      return upsertEventLinks(
        state,
        action.data.map((link) => ({
          ...link,
          loading: false,
          synced: true
        }))
      )
    default:
      return state
  }
}
