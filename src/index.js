// CSS
import '../node_modules/font-awesome/css/font-awesome.min.css'
import './build-index.css'
import '../node_modules/react-datetime/css/react-datetime.css'

// !CSS

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { setStore } from './p2p-connection'

import { Provider } from 'react-redux'
import store from './store'

var toRender = (
  <Provider store={store}>
    <App loadDataOnStart />
  </Provider>
)

setStore(store)

ReactDOM.render(toRender, document.getElementById('root'))
registerServiceWorker()
