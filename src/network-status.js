import { check, watch } from 'is-offline'
import timelineActions from './action-creators/timeline'
import allActions from './action-creators/all'

import SDK from './timeline-sdk'

var syncEvents = async function (store) {
  await allActions.loadAllData()(store.dispatch)
  for (var toSync of store.getState().sync) {
    if (toSync.action === 'create') {
      store.dispatch(timelineActions.create(toSync.data))
    } else if (toSync.action === 'delete') {
      store.dispatch(timelineActions.delete(toSync.data.Id))
    } else if (toSync.action === 'edit') {
      var currentTimeline = await SDK.Timelines.get(toSync.data.Id)
      if (currentTimeline.Title === toSync.data.Title
        || currentTimeline.Title === toSync.prevData.Title) {
        store.dispatch(timelineActions.edit(toSync.data))
      } else {
        store.dispatch({
          type: 'ADD_SYNC_CONFLICT',
          data: toSync
        })
      }
    }
    store.dispatch({
      type: 'CLEAR_SYNC_QUEUE_ITEM',
      id: toSync.id
    })
  }
}

export default function (store) {
  var updateStatus = function (status) {
    store.dispatch({
      type: 'UPDATE_NETWORK_STATUS',
      status
    })
    if (!status) syncEvents(store)
  }
  check().then(updateStatus)
  watch(updateStatus)
}
