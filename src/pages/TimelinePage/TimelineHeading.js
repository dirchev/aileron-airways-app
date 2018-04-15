import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import EditableText from '../../components/inputs/EditableText'

class TimelineHeading extends Component {
  render() {
    return (
      <div>
        <div className="title">
          <h1>
            <EditableText defaultValue={this.props.timeline.Title} onChange={this.props.onTitleChange}>
              {this.props.timeline.Title}
            </EditableText>
          </h1>
        </div>
        <div className="subtitle">
          <p>{moment(this.props.timeline.CreationTimeStamp).fromNow()}</p>
        </div>
      </div>
    )
  }
}

TimelineHeading.propTypes = {
  timeline: PropTypes.shape({
    Id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    CreationTimeStamp: PropTypes.string.isRequired,
  }).isRequired,
  onTitleChange: PropTypes.func.isRequired
}

export default TimelineHeading
