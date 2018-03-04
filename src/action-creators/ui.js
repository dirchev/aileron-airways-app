import actions from './actions.js'
/**
 * Emits an action to change the timelines filter term
 * @param {string} filterTerm to be set
 * @returns {object} action
 */
const setTimelinesFilter = function (filterTerm) {
  return {
    type: actions.ui.SET_TIMELINES_FILTER,
    data: filterTerm
  }
}

export default {
  setTimelinesFilter: setTimelinesFilter
}
