import signalhub from 'signalhub'
import uuid from 'uuid'

var id = uuid.v4()
var hub = signalhub('timelines', [
  'https://signalhub-divkuknify.now.sh'
])
var store

hub.subscribe('all')
  .on('data', function (message) {
    if (!store || message.id === id) return
    store.dispatch(message.action)
  })

export function setStore (value) {
  store = value
}

export function push (action) {
  hub.broadcast('all', {id: id, action})
}
