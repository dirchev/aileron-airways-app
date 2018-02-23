import React, { Component } from 'react'

class EventSearchInput extends Component {
  render() {
    return (
      <div className="navbar-item" key="search-input">
        <div className="field">
          <p className="control has-icons-right">
            <input className="input" name="search" placeholder="Search event..." type="text" />
            <span className="icon is-small is-right">
              <i className="fa fa-search"></i>
            </span>
          </p>
        </div>
      </div>
    )
  }
}

export default EventSearchInput
