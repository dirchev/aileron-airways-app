import React, { Component } from 'react'
import timelineActions from '../../actions/timeline'
import { connect } from 'react-redux'

let count = 1

class CreateTimelineButton extends Component {
  constructor () {
    super()
    this.showEditTimelineModal = this.showEditTimelineModal.bind(this)
  }

  showEditTimelineModal () {
    this.props.create({Title: 'New Timeline ' + count++})
  }

  render() {
    return (
      <a className="navbar-item" onClick={this.showEditTimelineModal} key="create-event-button">
        <i className="fa fa-plus mr-sm"></i>
        Create Timeline
      </a>
    )
  }
}

const mapDispatchToProps = timelineActions

export default connect(null, mapDispatchToProps)(CreateTimelineButton)
