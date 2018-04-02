import React, { Component } from 'react'
import EventsList from '../../components/EventsList'

// Holds the different view modes of events in a timeline:
// Calendar, List and Timeline
class TimelineEvents extends Component {
  constructor () {
    super()
    this.state = {
      viewMode: 'list'
    }

    this.handleChangeViewMode = this.handleChangeViewMode.bind(this)
  }

  handleChangeViewMode (viewMode) {
    return (e) => {
      e.preventDefault()
      this.setState({viewMode})
    }
  }

  render() {
    return (
      <div>
        <div className="buttons has-addons is-right">
          <button onClick={this.handleChangeViewMode('list')} className={`button ${this.state.viewMode === 'list' ? 'is-primary': ''}`}>
            <span>List</span>
            <span className="icon is-small"><i className="fa fa-list-ul"></i></span>
          </button>
          <button onClick={this.handleChangeViewMode('calendar')} className={`button ${this.state.viewMode === 'calendar' ? 'is-primary': ''}`}>
            <span>Calendar</span>
            <span className="icon is-small"><i className="fa fa-calendar"></i></span>
          </button>
          <button onClick={this.handleChangeViewMode('timeline')} className={`button ${this.state.viewMode === 'timeline' ? 'is-primary': ''}`}>
            <span>Timeline</span>
            <span className="icon is-small"><i className="fa fa-history"></i></span>
          </button>
        </div>
        {this.renderEvents()}
      </div>
    )
  }

  renderEvents () {
    if (this.state.viewMode === 'list') {
      return (<EventsList events={this.props.timeline.events} />)
    }
    return (
      <div>
        Not implemented
      </div>
    )
  }
}

export default TimelineEvents
