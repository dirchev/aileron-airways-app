// CSS
import '../node_modules/font-awesome/css/font-awesome.min.css'
import './build-index.css'
import '../node_modules/react-datetime/css/react-datetime.css'

// !CSS

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import initStore from './store'

var {store, persistor} = initStore()

var toRender = (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App loadDataOnStart />
    </PersistGate>
  </Provider>
)

ReactDOM.render(toRender, document.getElementById('root'))
registerServiceWorker()
