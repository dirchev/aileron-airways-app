import React, { Component } from 'react'

import moment from 'moment'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import HighlightedText from '../HighlightedText'

class TimelineItem extends Component {
  getMatches (key, arrayIndex = 0) {
    var found = _.find(this.props.searchResult.matches, {key, arrayIndex}) || []
    return (found && found.indices) || []
  }

  render() {
    var searchResult = this.props.searchResult
    var timeline = searchResult.item
    return (
      <div className="box mb-sm">
        <div className="media">
          <div className="media-content">
            <div className="content">
              <div className="title">
                <Link to={`/timeline/${timeline.Id}`}>
                  <HighlightedText matches={this.getMatches('Title')}>
                    {timeline.Title}
                  </HighlightedText>
                </Link>
                <div className="subtitle">
                  {moment(timeline.CreationTimeStamp).format("MMMM Do YYYY")}
                </div>
              </div>
              {
                timeline.events
                  .filter((e, index) => this.getMatches('events.Title', index).length || this.getMatches('events.Description', index).length)
                  .map((event, index) => {
                    return (
                      <div key={event.Id} className="media">
                        <div className="media-content">
                          <Link to={`/event/${event.Id}`}>
                            <HighlightedText matches={this.getMatches('events.Title', index)}>
                              {event.Title}
                            </HighlightedText>
                          </Link>
                          <p>
                            <HighlightedText matches={this.getMatches('events.Description', index)}>
                              {event.Description}
                            </HighlightedText>
                          </p>
                        </div>
                      </div>
                    )
                  })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TimelineItem
