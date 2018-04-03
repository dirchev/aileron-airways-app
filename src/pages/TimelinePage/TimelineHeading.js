import React, { Component } from 'react'
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

export default TimelineHeading
