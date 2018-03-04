import { combineReducers } from 'redux'

import timelinesReducer from './timelines'
import uiReducer from './ui'

export default combineReducers({
  timelines: timelinesReducer,
  ui: uiReducer
})
