import { combineReducers } from 'redux'

import timelinesReducer from './timelines'
import eventsReducer from './events'
import eventLinksReducer from './event-links'
import uiReducer from './ui'
import attachmentsReducer from './attachments'
import syncReducer from './sync'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  timelines: timelinesReducer,
  ui: uiReducer,
  events: eventsReducer,
  eventLinks: eventLinksReducer,
  attachments: attachmentsReducer,
  router: routerReducer,
  sync: syncReducer
})
