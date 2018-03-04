import React, { Component } from 'react'
import Timeline from './TimelineListItem'
import PropTypes from 'prop-types'

/*
   TimelinesList
   gets an array of timelines and renders timeline items
*/
class TimelinesList extends Component {
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
  timelines: PropTypes.array
}

export default TimelinesList
