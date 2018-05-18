// CSS
import '../node_modules/font-awesome/css/font-awesome.min.css'
import './build-index.css'
import '../node_modules/react-datetime/css/react-datetime.css'
// !CSS

import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import HomePage from './pages/HomePage'
import TimelinePage from './pages/TimelinePage'
import EventPage from './pages/EventPage'
import GlobalMessage from './components/GlobalMessage'
import ModalsParent from './components/modals/ModalsParent'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import { setStore } from './p2p-connection'
import setupNetworkStatus from './network-status'
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import getStore from './store'

const history = createHistory()
const store = getStore(history)

setStore(store)
setupNetworkStatus(store)

var toRender = (
  <Provider store={store}>
    <Fragment>
      <ConnectedRouter history={history}>
        <Fragment>
          <Route path="*" component={GlobalMessage} />
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/timeline/:Id" component={TimelinePage}></Route>
          <Route exact path="/event/:Id" component={EventPage}></Route>
        </Fragment>
      </ConnectedRouter>
      <ModalsParent />
    </Fragment>
  </Provider>
)

ReactDOM.render(toRender, document.getElementById('root'))
registerServiceWorker()
