import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class GlobalMessage extends Component {
  render () {
    if (this.props.ui.networkIsOffline) {
      return (
        <div className="offline-message">You are offline</div>
      )
    }
    return null
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ui: state.ui
  }
}

export default connect(mapStateToProps)(GlobalMessage)
