import { check, watch } from 'is-offline'

export default function (store) {
  var updateStatus = function (status) {
    store.dispatch({
      type: 'UPDATE_NETWORK_STATUS',
      status
    })
  }
  check().then(updateStatus)
  watch(updateStatus)
}