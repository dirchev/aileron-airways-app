import React, { Component } from 'react'
import { connect } from 'react-redux'

export class GlobalMessage extends Component {
  constructor () {
    super()

    this.resolveConflict = this.resolveConflict.bind(this)
  }

  resolveConflict (item) {
    return () => {
      this.props.resolveConflict(item.id)
      this.props.history.push(`/${item.type}/${item.data.Id}`)
    }
  }

  render () {
    if (this.props.ui.syncConflicts.length) {
      return this.props.ui.syncConflicts.map((item) => {
        return (
          <button key={item.id} onClick={this.resolveConflict(item)} className="sync-message">
            Merge conflict <br/>
            {item.type} {item.field} can not be set to "{item.prevData[item.field]}"
          </button >
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

const mapDispatchToProps = (dispatch) => {
  return {
    resolveConflict: (id) => {
      dispatch({
        type: 'REMOVE_SYNC_CONFLICT',
        id
      })
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(GlobalMessage)
