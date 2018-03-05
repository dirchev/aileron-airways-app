import React, { Component } from 'react'
import { connect } from 'react-redux'

import CreateTimelineModal from './CreateTimelineModal'
import uiActions from '../../action-creators/ui'

const modalsMap = {
  'createTimeline': CreateTimelineModal
}

class ModalsParent extends Component {
  getOpenedModal () {
    if (!this.props.modalOpened) return null
    var Component = modalsMap[this.props.modalOpened]
    if (!Component) return null
    return <Component onClose={this.props.onModalClose} />
  }

  render () {
    return (
      <div>
        {this.getOpenedModal()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    modalOpened: state.ui.modal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onModalClose: function () {
      dispatch(uiActions.openModal(null))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalsParent)
