import React, { Component } from 'react'

import moment from 'moment'
import { Link } from 'react-router-dom'

class TimelineItem extends Component {
  render() {
    var timeline = this.props.timeline
    return (
      <Link to={`/timeline/${timeline.Id}`} className="box mb-sm">
        <div className="media">
          <div className="media-content">
            <div className="content">
              <div className="title">
                {timeline.Title}
              </div>
              <div className="subtitle">
                {moment(timeline.CreationTimeStamp).format("MMMM Do YYYY")}
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

export default TimelineItem
