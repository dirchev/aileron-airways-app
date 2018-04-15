import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Navigation extends Component {
  constructor () {
    super()
    this.state = {
      opened: false
    }
  }

  render () {
    return (
      <div className="navbar is-primary is-fixed-top">
        <div className="navbar-brand">
          {
            this.props.actions.map(function (element) {
              return element
            })
          }
        </div>
      </div>
    )
  }
}

Navigation.defaultProps = {
  actions: [],
}

Navigation.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.element),
}

export default Navigation
