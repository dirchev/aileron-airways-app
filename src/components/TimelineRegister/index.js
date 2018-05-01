import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { push } from 'react-router-redux'

import Pagination from '../Pagination'

export class TimelineRegister extends Component {
  constructor () {
    super()

    this.state = {
      page: 1,
      limit: 10,
      sort: {
        path: 'Title',
        order: 1
      }
    }

    this.handleSortChange = this.handleSortChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handlePageChange (page) {
    this.setState({page: page})
  }

  handleSortChange (path) {
    return (e) => {
      this.setState({
        page: 1,
        sort: {
          path: path,
          order: this.state.sort.path === path ? this.state.sort.order * -1 : 1
        }
      })
    }
  }

  getTimelines () {
    var result = _.chain(this.props.timelines).sortBy(this.state.sort.path)
    if (this.state.sort.order === -1) {
      result = result.reverse()
    }
    if (this.state.limit) {
      let start = (this.state.page - 1) * 10
      let end = this.state.page * 10
      result = result.slice(start, end)
    }
    return result.value()
  }

  render() {
    return (
      <div>
        <table className="table is-fullwidth is-bordered is-hoverable">
          <thead>
            <tr>
              <th className="is-sortable" onClick={this.handleSortChange('Title')}>
                Title
                {
                  this.state.sort.path === 'Title'
                  ? (
                    <i className={`th-icon fa fa-caret-${this.state.sort.order === -1 ? 'up' : 'down'}`}></i>
                  ) : null
                }
              </th>
              <th className="is-sortable" onClick={this.handleSortChange('CreationDateTime')}>
                Creation Date
                {
                  this.state.sort.path === 'CreationDateTime'
                  ? (
                    <i className={`th-icon fa fa-caret-${this.state.sort.order === -1 ? 'up' : 'down'}`}></i>
                  ) : null
                }
              </th>
              <th className="is-sortable is-hidden-mobile" onClick={this.handleSortChange('NoEvents')}>
                # of Events
                {
                  this.state.sort.path === 'NoEvents'
                  ? (
                    <i className={`th-icon fa fa-caret-${this.state.sort.order === -1 ? 'up' : 'down'}`}></i>
                  ) : null
                }
              </th>
              <th className="is-sortable is-hidden-mobile" onClick={this.handleSortChange('LastEventDate')}>
                Last Event Date
                {
                  this.state.sort.path === 'LastEventDate'
                  ? (
                    <i className={`th-icon fa fa-caret-${this.state.sort.order === -1 ? 'up' : 'down'}`}></i>
                  ) : null
                }
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderItems()}
          </tbody>
        </table>
        <Pagination page={this.state.page} pages={Math.ceil(this.props.timelines.length / this.state.limit)} onPageChange={this.handlePageChange}/>
      </div>
    )
  }

  renderItems () {
    return this.getTimelines().map((timeline) => {
      var handleOpenTimeline = () => {
        this.props.openTimeline(timeline.Id)
      }
      return (
        <tr key={timeline.Id} onClick={handleOpenTimeline} className="is-clickable">
          <td>{timeline.Title}</td>
          <td>{moment(timeline.CreationTimeStamp).format('DD MMM YYYY HH:mm')}</td>
          <td className="is-hidden-mobile">{timeline.NoEvents}</td>
          <td className="is-hidden-mobile">{timeline.LastEventDate && moment(timeline.LastEventDate).format('DD MMM YYYY HH:mm')}</td>
        </tr>
      )
    })
  }
}

TimelineRegister.propTypes = {
  timelines: PropTypes.arrayOf(PropTypes.shape({
    Id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    CreationTimeStamp: PropTypes.string.isRequired,
    LastEventDate: PropTypes.string,
    NoEvents: PropTypes.number.isRequired,
  })).isRequired
}

const mapStateToProps = (state) => {
  var timelines = _.chain(state.timelines).values().map(function (timeline) {
    var events = _.chain(state.events).values().filter({TimelineId: timeline.Id}).sortBy('EventDateTime').value()
    return {
      ...timeline,
      NoEvents: events.length,
      LastEventDate: events[0] ? events[0].EventDateTime : null
    }
  }).value()
  return {
    timelines
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openTimeline: (timelineId) => {
      dispatch(push(`/timeline/${timelineId}`))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelineRegister)
