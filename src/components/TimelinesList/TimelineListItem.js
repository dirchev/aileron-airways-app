import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class TimelineListItem extends Component {
  renderContent () {
    if (this.props.loading) {
      return (<p className="subtitle"><i className="fa fa-spinner fa-spin mr-sm"></i> Loading...</p>)
    } else if (this.props.error) {
      return (<p className="subtitle"><i className="fa fa-times mr-sm"></i> {this.props.error.message}</p>)
    } else {
      return (<p className="subtitle"><i className="fa fa-check mr-sm"></i> {moment(this.props.CreationTimeStamp).fromNow()}</p>)
    }
  }

  render() {
    return (
      <Link to={`/timeline/${this.props.Id}`} className="column is-half-tablet is-one-third-desktop">
        <div className={`notification ${this.props.synced ? 'is-primary' : ''}`}>
          <p className="title">{this.props.Title}</p>
          {this.renderContent()}
        </div>
      </Link>
    )
  }
}

TimelineListItem.propTypes = {
  Id: PropTypes.string,
  Title: PropTypes.string,
  CreationTimeStamp: PropTypes.number,
  synced: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.object
}

export default TimelineListItem
