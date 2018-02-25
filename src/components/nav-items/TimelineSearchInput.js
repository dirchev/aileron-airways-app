import React, { Component } from 'react'
import timelineActions from '../../actions/timeline'
import { connect } from 'react-redux'
import _ from 'lodash'

class TimelineSearchInput extends Component {
  constructor () {
    super()
    this.onFilterChange = this.onFilterChange.bind(this)
  }

  onFilterChange (value) {
    this.props.setTimelinesFilter(value)
  }

  render() {
    return (
      <div className="navbar-item" key="search-input">
        <div className="field">
          <p className="control has-icons-right">
            <input
              className="input"
              name="search"
              placeholder="Search timeline..."
              type="text"
              onKeyUp={({target}) => _.debounce(this.onFilterChange, 300)(target.value)}
            />
            <span className="icon is-small is-right">
              <i className="fa fa-search"></i>
            </span>
          </p>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  setTimelinesFilter: timelineActions.setTimelinesFilter
}

export default connect(null, mapDispatchToProps)(TimelineSearchInput)
