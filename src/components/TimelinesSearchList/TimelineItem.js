import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
                  .map((e, index) => { return {...e, matches: this.getMatches('events.Title', index)}})
                  .filter((e) => e.matches.length)
                  .map((event, index) => {
                    return (
                      <div key={event.Id} className="media">
                        <div className="media-content">
                          <Link to={`/event/${event.Id}`}>
                            <HighlightedText matches={event.matches}>
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

TimelineItem.propTypes = {
  searchResult: PropTypes.shape({
    item: PropTypes.shape({
      Id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      events: PropTypes.arrayOf(PropTypes.shape({
        Id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
      }))
    }).isRequired,
    matches: PropTypes.arrayOf(PropTypes.shape({
      arrayIndex: PropTypes.number.isRequired,
      indices: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }))
  }).isRequired
}

export default TimelineItem
