import React, { Component } from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import TimelinePage from './pages/TimelinePage';
import EventPage from './pages/EventPage';

import { Provider } from 'react-redux'
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={HomePage}></Route>
            <Route exact path="/timeline/:Id" component={TimelinePage}></Route>
            <Route exact path="/event" component={EventPage}></Route>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
