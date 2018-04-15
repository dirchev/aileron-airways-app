import React, { Component } from 'react'
import PropTypes from 'prop-types'

class HomeOptionsButton extends Component {
  constructor () {
    super()
    this.state = {
      opened: false
    }

    this.toggleOpened = this.toggleOpened.bind(this)
    this.createTimeline = this.createTimeline.bind(this)
  }

  toggleOpened (e) {
    e.preventDefault()
    this.setState({opened: !this.state.opened})
  }

  createTimeline (e) {
    e.preventDefault()
    this.props.createTimeline()
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
        <button className="button" onClick={this.createTimeline}>Create Timeline</button>
      </div>
    )
  }
}

HomeOptionsButton.propTypes = {
  createTimeline: PropTypes.func.isRequired
}

export default HomeOptionsButton
