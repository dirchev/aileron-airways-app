import _ from 'lodash'
const defaultState = {}

/**
 * Upsert Timeline
 * Adds new timeline to the state or overrides currently existing one.
 * The comparison is made by `timelineData.Id` matching a key from the `state` object
 *
 * @param {Object} state current redux state
 * @param {Object} timelineData timeline to be added/edited
 * @returns {Object} new version of the state
 */
const upsertTimeline = function (state, timelineData) {
  return {
    ...state,
    [timelineData.Id]: {
      ...state[timelineData.Id],
      ...timelineData
    }
  }
}

/**
 * Remove Timeline
 * Removes a timeline from the state if exists.
 * The comparison is made by `timelineData.Id` matching a key from the `state` object
 *
 * @param {Object} state current redux state
 * @param {Object} timelineData timeline to be removed
 * @returns {Object} new version of the state
 */
const removeTimeline = function (state, timelineData) {
  return _.omit(state, timelineData.Id)
}

/**
 * Upsert Timelines
 * Goes through every timeline in the array and upserts it to the state, using the
 * upsertTimeline logic.
 *
 * @param {Object} state current redux state
 * @param {Object} timelinesArr timelines to be upserted
 * @returns {Object} new version of the state
 */
const upsertTimelines = function (state, timelinesArr) {
  return timelinesArr.reduce(upsertTimeline, state)
}

export default function timelinesReducer (state = defaultState, action) {
  switch(action.type) {
    case 'START_FETCH_EVENTS':
      return upsertTimeline(state, {
        ...action.data,
        loadingEvents: true
      })
    case 'SUCCESS_FETCH_EVENTS':
    case 'ERROR_FETCH_EVENTS':
      return upsertTimeline(state, {
        ...action.data,
        loadingEvents: false
      })
    case 'START_CREATE_TIMELINE':
    case 'START_EDIT_TIMELINE':
    case 'START_DELETE_TIMELINE':
      return upsertTimeline(state, {
        ...action.data,
        loading: true,
        synced: false
      })
    case 'SUCCESS_CREATE_TIMELINE':
    case 'SUCCESS_EDIT_TIMELINE':
    case 'SYNC_TIMELINE':
      return upsertTimeline(state, {
        ...action.data,
        loading: false,
        synced: true
      })
    case 'ERROR_EDIT_TIMELINE':
    case 'ERROR_CREATE_TIMELINE':
    case 'ERROR_DELETE_TIMELINE':
      return upsertTimeline(state, {
        ...action.data,
        loading: false,
        synced: false,
        error: action.error
      })
    case 'SUCCESS_DELETE_TIMELINE':
      return removeTimeline(state, action.data)
    case 'SUCCESS_FETCH_TIMELINES':
      return upsertTimelines(
        state,
        action.data.map((item) => ({
          ...item,
          loading: false,
          synced: true
        }))
      )
    default:
      return state
  }
}
