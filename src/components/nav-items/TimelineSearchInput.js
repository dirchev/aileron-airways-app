import React, { Component } from 'react'
import uiActions from '../../action-creators/ui'
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

const mapDispatchToProps = function (dispatch) {
  return {
    setTimelinesFilter: (filter) => {
      dispatch(uiActions.setTimelinesFilter(filter))
    }
  }
}

export default connect(null, mapDispatchToProps)(TimelineSearchInput)
