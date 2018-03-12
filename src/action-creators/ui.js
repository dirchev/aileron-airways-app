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

/**
 * Emits an action to open a modal
 * @param {string} modalName to be opened
 * @returns {object} action
 */
const openModal = function (modalName, modalProps) {
  return {
    type: actions.ui.OPEN_MODAL,
    data: modalName,
    props: modalProps
  }
}

export default {
  setTimelinesFilter: setTimelinesFilter,
  openModal: openModal
}
