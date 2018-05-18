import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

export class GlobalMessage extends Component {
  render () {
    if (this.props.ui.syncConflicts.length) {
      return this.props.ui.syncConflicts.map((item) => {
        return (
          <Link key={item.id} to={`/${item.type}/${item.data.Id}`} class="sync-message">
            Merge conflict <br/>
            {item.type} {item.field} can not be set to "{item.prevData[item.field]}"
          </Link>
        )
      })
    }
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
