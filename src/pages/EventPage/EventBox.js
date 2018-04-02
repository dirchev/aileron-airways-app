import React, { Component } from 'react'

import moment from 'moment'
import EditableText from '../../components/inputs/EditableText'
import EditableTextArea from  '../../components/inputs/EditableTextArea'

class EventBox extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-content">
          <div className="title">
            <EditableText defaultValue={this.props.event.Title} onChange={this.props.handleTitleChange}>
              {this.props.event.Title}
            </EditableText>
          </div>
          {
            this.props.event.EventDateTime
              ? (
                <div className="subtitle">
                  <time>
                    {moment(this.props.event.EventDateTime).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                  </time>
                </div>
              )
              : null
          }
          <span>
            <EditableTextArea
              defaultValue={this.props.event.Description}
              onChange={this.props.handleDescriptionChange}
            >
              {this.props.event.Description}
            </EditableTextArea>
          </span>
        </div>
      </div>
    )
  }
}

export default EventBox
