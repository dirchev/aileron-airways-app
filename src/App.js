import React, { Component } from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import TimelinePage from './pages/TimelinePage';
import EventPage from './pages/EventPage';
import ModalsParent from './components/modals/ModalsParent'
import SDK from './timeline-sdk'

import { Provider } from 'react-redux'
import store from './store'

class App extends Component {
  constructor () {
    super()

    this.state = {
      storeLoaded: false,
      initialStoreState: null
    }
  }

  componentDidMount () {
    // TODO read from local storage if exists
    SDK.Timelines.getTimelinesAndEvents()
      .then((result) => {
        var timelines = {}
        var events = {}
        result.Timelines.forEach(function (timeline) {
          timelines[timeline.Id] = {
            Id: timeline.Id,
            Title: timeline.Title,
            CreationTimeStamp: timeline.CreationTimeStamp,
            loading: false,
            synced: true
          }
          timeline.TimelineEvents.forEach(function (event) {
            events[event.Id] = {
              Id: event.Id,
              Title: event.Title,
              Description: event.Description,
              EventDateTime: event.EventDateTime,
              Location: event.Location,
              TimelineId: timeline.Id,
              loading: false,
            }
          })
        })
        this.setState({
          storeLoaded: true,
          initialStoreState: {
            timelines: timelines,
            events: events,
            ui: {},
            eventLinks: []
          }
        })
      })
      .catch((e) => {
        // store with empty initial state
        console.log(e);
        this.setState({storeLoaded: true})
      })
  }

  render() {
    if (!this.state.storeLoaded) return (
      <div className="pageloader is-active">
        <div className="title has-text-centered">
          Aileron Airways Milestone App <br/>
          Team 7
        </div>
      </div>
    )
    return (
      <Provider store={store(this.state.initialStoreState)}>
        <div className="pb-lg">
          <BrowserRouter>
            <div>
              <Route exact path="/" component={HomePage}></Route>
              <Route exact path="/timeline/:Id" component={TimelinePage}></Route>
              <Route exact path="/event/:Id" component={EventPage}></Route>
            </div>
          </BrowserRouter>
          <ModalsParent />
        </div>
      </Provider>
    )
  }
}

export default App
