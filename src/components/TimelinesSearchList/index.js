import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import Fuse from 'fuse.js'

import Pagination from '../Pagination'
import TimelineItem from './TimelineItem'

const FUSE_OPTIONS = {
  includeMatches: true,
  tokenize: true,
  keys: [
    {name: 'Title', weight: 0.6},
    {name: 'events.Title', weight: 0.6},
    {name: 'events.Description', weight: 0.4}
  ]
}

export class TimelinesSearchList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      searchResults: []
    }
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handlePageChange (page) {
    this.setState({page})
  }

  render() {
    var skip = this.state.page * 10 - 10
    if (!this.props.timelinesFilter) {
      return (
        <div className="notification">
          Please specify a search term.
        </div>
      )
    }
    return (
      <div>
        <div className="notification">
          Showing results for "{this.props.timelinesFilter}"
        </div>
        {
          this.state.searchResults.slice(0 + skip, 10 + skip).map(function (searchResult) {
            return <TimelineItem key={searchResult.item.Id} searchResult={searchResult}/>
          })
        }
        <Pagination
          page={this.state.page}
          pages={Math.ceil(this.state.searchResults.length / 10)}
          onPageChange={this.handlePageChange} />
      </div>
    )
  }
}

TimelinesSearchList.getDerivedStateFromProps = function (nextProps) {
  // the timelines array has been changed. re-initialize the search
  var fuseSearch = new Fuse(nextProps.timelines, FUSE_OPTIONS)

  // the filter is changed. update results
  return {
    page: 1,
    searchResults: fuseSearch.search(nextProps.timelinesFilter)
  }
}

TimelinesSearchList.propTypes = {
  timelines: PropTypes.array,
  timelinesFilter: PropTypes.string
}

const mapStateToProps = (state) => {
  var filter = state.ui.timelinesFilter
  var timelines = _
    .chain(state.timelines) // lodash chain
    .values() // get array
    // attach events to timeline.events
    .map(function (timeline) {
      return {
        ...timeline,
        events: _.chain(state.events).values().filter({TimelineId: timeline.Id}).value()
      }
    })
    .value() // end of chain
  return {
    timelines: timelines,
    timelinesFilter: filter
  }
}

export default connect(mapStateToProps)(TimelinesSearchList)
