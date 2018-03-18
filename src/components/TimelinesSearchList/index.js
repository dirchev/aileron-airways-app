import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import Fuse from 'fuse.js'

import TimelineItem from './TimelineItem'

const FUSE_OPTIONS = {
  keys: [
    {name: 'Title', weight: 0.5}
    // TODO enable these when we fetch all timelines and events
    /* {name: 'events.Title', weight: 0.4}*/
    /* {name: 'events.Description', weight: 0.3}*/
  ]
}

class TimelinesSearchList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      timelines: props.timelines
    }
    this.fuseSearch = new Fuse(this.state.timelines, FUSE_OPTIONS)
  }

  // every time there are new props - we need to re-calculate the search results
  componentWillReceiveProps (nextProps) {
    // the timelines array has been changed. re-initialize the search
    if (_.isEqual(this.props.timelines, nextProps.timelines)) {
      this.fuseSearch = new Fuse(nextProps.timelines, FUSE_OPTIONS)
    }

    // the filter is changed. update results
    if (this.props.timelinesFilter !== nextProps.timelinesFilter) {
      this.setState({
        timelines: this.fuseSearch.search(nextProps.timelinesFilter)
      })
    }
  }

  render() {
    return (
      <div>
        <div className="notification">
          Showing results for "{this.props.timelinesFilter}"
        </div>
        {
          this.state.timelines.map(function (timeline) {
            return <TimelineItem key={timeline.Id} timeline={timeline}/>
          })
        }
      </div>
    )
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
    .value() // end of chain
  return {
    timelines: timelines,
    timelinesFilter: filter
  }
}

export default connect(mapStateToProps)(TimelinesSearchList)
