import React, { Component } from 'react'
import { connect } from 'react-redux'
import Timeline from './TimelineListItem'
import PropTypes from 'prop-types'
import _ from 'lodash'

export class TimelinesList extends Component {
  render() {
    return (
      <div className="columns is-multiline">
        {
          this.props.timelines.map((timeline) => {
            return (
              <Timeline key={timeline.Id} {...timeline}/>
            )
          })
        }
      </div>
    )
  }
}

TimelinesList.propTypes = {
  timelines: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    // TODO get only starred timelines
    timelines: _.chain(state.timelines).values().take(6).value(), // get 6 timelines
  }
}

export default connect(mapStateToProps)(TimelinesList)
