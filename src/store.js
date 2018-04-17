import reducer from './reducers'
import thunk from 'redux-thunk'
import { persistReducer, persistStore } from 'redux-persist'
import { createStore, applyMiddleware } from 'redux'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['ui']
}

const persistedReducer = persistReducer(persistConfig, reducer)

export default () => {
  let store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  )
  let persistor = persistStore(store)
  return {store, persistor}
}
