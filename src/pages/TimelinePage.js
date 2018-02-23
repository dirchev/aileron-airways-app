import React, { Component } from 'react'

import Navigation from '../components/Navigation'
import EventSearchInput from '../components/nav-items/EventSearchInput'
import EditTimelineButton from '../components/nav-items/EditTimelineButton'
import CreateEventButton from '../components/nav-items/CreateEventButton'

class TimelinePage extends Component {
  getNavigationItems () {
    var backButton = (
      <a className="navbar-item" href="" key="back-button">
        <i className="fa fa-chevron-left mr-sm"></i>
        Back
      </a>
    )

    return {
      actionsLeft: [backButton],
      actionsRight: [<EventSearchInput />, <EditTimelineButton />, <CreateEventButton />]
    }
  }

  render() {
    return (
      <div>
        <Navigation {...this.getNavigationItems()}/>
        <div className="hero">
          <div className="hero-body">
            <div className="title">
              <h1>Timeline Page</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TimelinePage
