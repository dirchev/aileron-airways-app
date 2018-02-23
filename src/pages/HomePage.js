import React, { Component } from 'react'
import Navigation from '../components/Navigation'
import TimelineSearchInput from '../components/nav-items/TimelineSearchInput'
import TimelineCreateButton from '../components/nav-items/CreateTimelineButton'

class HomePage extends Component {
  getNavigationItems () {
    return {
      actionsRight: [
        <TimelineSearchInput key="timeline-search" />,
        <TimelineCreateButton key="timeline-create"/>
      ]
    }
  }

  render() {
    return (
      <div>
        <Navigation {...this.getNavigationItems()}/>
        <div className="hero">
          <div className="hero-body">
            <div className="title">
              <h1>Aileron Airways</h1>
            </div>
            <div className="subtitle">
              IP3 Project - Home Page
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
