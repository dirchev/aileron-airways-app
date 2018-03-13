import React, { Component } from 'react'

class TimelineOptionsButton extends Component {
  constructor () {
    super()
    this.state = {
      opened: false
    }

    this.toggleOpened = this.toggleOpened.bind(this)
    this.deleteTimeline = this.deleteTimeline.bind(this)
  }

  toggleOpened (e) {
    e.preventDefault()
    this.setState({opened: !this.state.opened})
  }

  deleteTimeline (e) {
    e.preventDefault()
    this.props.deleteTimeline()
  }

  render() {
    return (
      <div className="page-options">
        {this.state.opened ? this.renderItems() : null}
        <button className="button is-medium is-danger is-circle" onClick={this.toggleOpened}>
          {
            this.state.opened
            ? (<i className="fa fa-times"></i>)
            : (<i className="fa fa-bars"></i>)
          }
        </button>
      </div>
    )
  }

  renderItems () {
    return (
      <div className="items">
        <button className="button" onClick={this.deleteTimeline}>Delete</button>
      </div>
    )
  }
}

export default TimelineOptionsButton
