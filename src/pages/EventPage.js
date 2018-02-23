import React, { Component } from 'react'
import Navigation from '../components/Navigation'
import EditEventButton from '../components/nav-items/EditEventButton'

class EventPage extends Component {
  getNavigationItems () {
    var backButton = (
      <a className="navbar-item" href="" key="back-button">
        <i className="fa fa-chevron-left mr-sm"></i>
        Back
      </a>
    )

    return {
      actionsLeft: [backButton],
      actionsRight: [<EditEventButton />],
    }
  }

  render() {
    return (
      <div>
        <Navigation {...this.getNavigationItems()}/>
        <div className="hero">
          <div className="hero-body">
            <div className="title">
              <h1>Event Page</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EventPage
