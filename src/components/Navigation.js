import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Navigation extends Component {
  constructor () {
    super()
    this.state = {
      opened: false
    }
    this.toggleOpened = this.toggleOpened.bind(this)
  }

  toggleOpened () {
    this.setState({
      opened: !this.state.opened
    })
  }

  render () {
    return (
      <div className="navbar">
        <div className="navbar-brand">
          <div
            className={'navbar-burger' + (this.state.opened ? ' is-active' : '')}
            onClick={this.toggleOpened}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={'navbar-menu' + (this.state.opened ? ' is-active' : '')}>
          <div className="navbar-start">
            {
              this.props.actionsLeft.map(function (element) {
                return element
              })
            }
          </div>
          <div className="navbar-end">
            {
              this.props.actionsRight.map(function (element) {
                return element
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

Navigation.defaultProps = {
  actionsLeft: [],
  actionsRight: []
}

Navigation.propTypes = {
  actionsLeft: PropTypes.arrayOf(PropTypes.element),
  actionsRight: PropTypes.arrayOf(PropTypes.element)
}

export default Navigation
