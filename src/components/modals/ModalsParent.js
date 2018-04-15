import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import CreateTimelineModal from './CreateTimelineModal'
import CreateEventModal from './CreateEventModal'
import LinkEventModal from './LinkEventModal'
import CreateAttachmentModal from './CreateAttachmentModal'

import uiActions from '../../action-creators/ui'

const modalsMap = {
  'createTimeline': CreateTimelineModal,
  'createEvent': CreateEventModal,
  'linkEvent': LinkEventModal,
  'createAttachment': CreateAttachmentModal
}

export class ModalsParent extends Component {
  getOpenedModal () {
    if (!this.props.modalOpened) return null
    var Component = modalsMap[this.props.modalOpened]
    if (!Component) return null
    return <Component onClose={this.props.onModalClose} {...this.props.modalProps} />
  }

  render () {
    return (
      <div>
        {this.getOpenedModal()}
      </div>
    )
  }
}

ModalsParent.propTypes = {
  modalOpened: PropTypes.string,
  modalProps: PropTypes.object,
  onModalClose: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    modalOpened: state.ui.modal,
    modalProps: state.ui.modalProps || {}
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
