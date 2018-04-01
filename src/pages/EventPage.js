import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Link, Redirect } from 'react-router-dom'
import eventActions from '../action-creators/event'
import EventOptionsButton from '../components/option-buttons/EventOptionsButton'
import Navigation from '../components/Navigation'
import EditableText from '../components/inputs/EditableText'
import EditableTextArea from  '../components/inputs/EditableTextArea'


class EventPage extends Component {
  constructor(props) {
    super(props)
    if (props.event) {
      // record the timeline id
      // we will use it when the event is deleted
      this.timelineId = props.event.TimelineId
    }
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
  }

  getNavigationItems() {
    var backButton = (
      <Link to={this.timelineId ? `/timeline/${this.timelineId}` : '/'}
        className="navbar-item"
        href=""
        key="back-button">
        <i className="fa fa-chevron-left mr-sm"></i>
        Back
      </Link>
    )

    return {
      actionsLeft: [backButton],
    }
  }

  handleTitleChange(newTitle) {
    this.props.changeEventTitle({
      ...this.props.event,
      Title: newTitle
    })
  }

  handleDescriptionChange(newDescription) {
    this.props.changeEventDescription({
      ...this.props.event,
      Description: newDescription
    })
  }

  render() {
    if (!this.props.event) {
      return (<Redirect to={this.timelineId ? `/timeline/${this.timelineId}` : '/'} />)
    }
    return (
      <div className="mb-lg">
        <Navigation {...this.getNavigationItems()} />
        <EventOptionsButton event={this.props.event} deleteEvent={this.props.deleteEvent} />
        <div className="container is-fluid">
          <div className="columns mt-lg">
            <div className="column is-one-quarter">
              Linked Events Map Here
            </div>
            <div className="column">
              <div className="card">
                <div className="card-content">
                  <div className="title">
                    <EditableText defaultValue={this.props.event.Title} onChange={this.handleTitleChange}>
                      {this.props.event.Title}
                    </EditableText>
                  </div>
                  {
                    this.props.event.EventDateTime
                      ? (
                        <div className="subtitle">
                          <time className="subtitle">{moment(this.props.event.EventDateTime).format("dddd, MMMM Do YYYY, h:mm:ss a")}</time>
                        </div>
                      )
                      : null
                  }
                  <span>
                    <EditableTextArea defaultValue={this.props.event.Description} onChange={this.handleDescriptionChange}>
                      {this.props.event.Description}
                    </EditableTextArea>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    event: state.events[ownProps.match.params.Id]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeEventTitle: function (eventData) {
      dispatch(eventActions.editTitle(eventData))
    },
    changeEventDescription: function (eventData) {
      dispatch(eventActions.editDescription(eventData))
    },
    deleteEvent: (eventId, timelineId) => {
      dispatch(eventActions.delete(eventId, timelineId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPage)