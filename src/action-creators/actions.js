/**
 * @fileOverview This file lists all of the available action types
 * @name actions.js
 */
const actionsList = {
  /**
   * Object of all ui related actions, such as search terms and others
   */
  ui: {
    SET_TIMELINES_FILTER: 'SET_TIMELINES_FILTER',
  },
  /**
   * Object of all ui related actions, such as search terms and others
   */
  timeline: {
    START_CREATE_TIMELINE: 'START_CREATE_TIMELINE',
    SUCCESS_CREATE_TIMELINE: 'SUCCESS_CREATE_TIMELINE',
    ERROR_CREATE_TIMELINE: 'ERROR_CREATE_TIMELINE',
  },
  /**
   * Object of all timelines related actions, such as fetch
   */
  timelines: {
    START_FETCH_TIMELINES: 'START_FETCH_TIMELINES',
    SUCCESS_FETCH_TIMELINES: 'SUCCESS_FETCH_TIMELINES',
    ERROR_FETCH_TIMELINES: 'ERROR_FETCH_TIMELINES',
  }
}

export default actionsList
