import { combineReducers } from 'redux'

import timelinesReducer from './timelines'
import eventsReducer from './events'
import uiReducer from './ui'

export default combineReducers({
  timelines: timelinesReducer,
  ui: uiReducer,
  events: eventsReducer
})
