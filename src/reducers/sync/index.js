import uuid from 'uuid'
const defaultState = []

/**
 * Upsert Item
 * Adds new item to the state or overrides currently existing one.
 * The comparison is made by `itemData.Id` matching a key from the `state` object
 *
 * @param {Object} state current redux state
 * @param {Object} itemData item to be added/edited
 * @returns {Object} new version of the state
 */
const upsertItem = function (state, itemData) {
  return [
    ...state,
    itemData
  ]
}

/**
 * Remove Item
 * Removes an item from the state if exists.
 * The comparison is made by `itemData.Id` matching a key from the `state` object
 *
 * @param {Object} state current redux state
 * @param {Object} itemData item to be removed
 * @returns {Object} new version of the state
 */
const removeItem = function (state, itemData) {
  return state.filter(({id}) => itemData.id !== id)
}

export default function syncReducer (state = defaultState, action) {
  switch(action.type) {
    case 'OFFLINE_CREATE_TIMELINE':
      return upsertItem(state, {
        id: uuid.v4(),
        type: 'Timeline',
        action: 'create',
        field: null,
        data: action.data
      })
    case 'OFFLINE_EDIT_TIMELINE':
      return upsertItem(state, {
        id: uuid.v4(),
        type: 'Timeline',
        action: 'edit',
        field: 'Title',
        prevData: action.prevData,
        data: action.data
      })
    case 'OFFLINE_DELETE_TIMELINE':
      return upsertItem(state, {
        id: uuid.v4(),
        type: 'Timeline',
        action: 'delete',
        field: null,
        data: action.data
      })
    case 'CLEAR_SYNC_QUEUE_ITEM':
      return removeItem(state, {id: action.id})
    default:
      return state
  }
}
