import _ from 'lodash'
const defaultState = {}


/**
 * Upsert Event
 * Adds new event to the state or overrides currently existing one.
 * The comparison is made by `eventData.Id` matching a key from the `state` object
 *
 * @param {Object} state current redux state
 * @param {Object} eventData event to be added/edited
 * @returns {Object} new version of the state
 */
const upsertEvent = function (state, eventData) {
  return {
    ...state,
    [eventData.Id]: {
      ...state[eventData.Id],
      ...eventData
    }
  }
}

/**
 * Remove Event
 * Removes an event from the state if exists.
 * The comparison is made by `eventData.Id` matching a key from the `state` object
 *
 * @param {Object} state current redux state
 * @param {Object} eventData event to be removed
 * @returns {Object} new version of the state
 */
const removeEvent = function (state, eventData) {
  return _.omit(state, eventData.Id)
}

/**
 * Upsert Events
 * Goes through every event in the array and upserts it to the state, using the
 * upsertEvent logic.
 *
 * @param {Object} state current redux state
 * @param {Object} eventsArr event to be upserted
 * @returns {Object} new version of the state
 */
const upsertEvents = function (state, eventsArr) {
  return eventsArr.reduce(upsertEvent, state)
}

export default function eventsReducer(state = defaultState, action) {
  switch (action.type) {
    case 'START_GET_EVENT_ATTACHMENTS':
      return upsertEvent(state, {
        ...action.data,
        Id: action.data.EventId,
        loadingAttachments: true
      })
    case 'SUCCESS_GET_EVENT_ATTACHMENTS':
    case 'ERROR_GET_EVENT_ATTACHMENTS':
      return upsertEvent(state, {
        ...action.data,
        Id: action.data.EventId,
        loadingAttachments: false
      })
    case 'START_CREATE_EVENT':
    case 'START_EDIT_EVENT_TITLE':
    case 'START_EDIT_EVENT_DESCRIPTION':
    case 'START_EDIT_EVENT_LOCATION':
    case 'START_DELETE_EVENT':
      return upsertEvent(state, {
        ...action.data,
        loading: true,
        synced: false
      })
    case 'SUCCESS_CREATE_EVENT':
    case 'SUCCESS_EDIT_EVENT_TITLE':
    case 'SUCCESS_EDIT_EVENT_DESCRIPTION':
    case 'SUCCESS_EDIT_EVENT_LOCATION':
    case 'SYNC_EVENT':
      return upsertEvent(state, {
        ...action.data,
        loading: false,
        synced: true
      })
    case 'ERROR_EDIT_EVENT_TITLE':
    case 'ERROR_EDIT_EVENT_DESCRIPTION':
    case 'ERROR_EDIT_EVENT_LOCATION':
    case 'ERROR_CREATE_EVENT':
    case 'ERROR_DELETE_EVENT':
      return upsertEvent(state, {
        ...action.data,
        loading: false,
        synced: false,
        error: action.error
      })
    case 'SUCCESS_FETCH_EVENTS':
      return upsertEvents(
        state,
        action.data.events.map((event) => ({
          ...event,
          loading: false,
          synced: true
        }))
      )
    case 'SUCCESS_DELETE_EVENT':
      return removeEvent(state, action.data)
    default:
      return state
  }
}
