import React, { Component } from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import TimelinePage from './pages/TimelinePage';
import EventPage from './pages/EventPage';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={HomePage}></Route>
            <Route exact path="/timeline" component={TimelinePage}></Route>
            <Route exact path="/event" component={EventPage}></Route>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
