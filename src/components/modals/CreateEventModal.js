import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
import eventActions from '../../action-creators/event'

import Input from '../inputs/Input'
import DatetimeInput from '../inputs/DatetimeInput'
import Textarea from '../inputs/Textarea'
import LocationInput from '../inputs/LocationInput'

import titleValidator from '../../validators/title'
import descriptionValidator from '../../validators/description'
import eventDateTimeValidator from '../../validators/eventDateTime'

export class CreateEventModal extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      eventDateTime: '',
      location: '',
      errors: {
        title: null,
        description: null,
        eventDateTime: null
      }
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(field) {
    return (value) => {
      var newState = {
        ...this.state,
        [field]: value
      }
      this.setState({
        ...newState,
        errors: {
          ...this.state.errors,
          [field]: this.getErrors(newState)[field]
        }
      })
    }
  }

  getErrors (state) {
    if (!state) state = this.state
    var errors = {
      title: titleValidator(state.title),
      description: descriptionValidator(state.description),
      eventDateTime: eventDateTimeValidator(state.eventDateTime)
    }
    return errors
  }

  onSubmit(e) {
    e.preventDefault()
    if (_.some(_.values(this.getErrors()), (e) => e)) {
      return this.setState({errors: this.getErrors()})
    }
    this.props.createEvent({
      TimelineId: this.props.timelineId,
      Title: this.state.title,
      Description: this.state.description,
      EventDateTime: this.state.eventDateTime ? moment(this.state.eventDateTime).toISOString() : null,
      Location: this.state.location
    })
    this.props.onClose()
  }

  render() {
    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="card">
            <div className="card-header">
              <div className="card-header-title">
                <h2>Create Event</h2>
              </div>
            </div>
            <div className="card-content">
              <form onSubmit={this.onSubmit}>
                <Input
                  onChange={this.onChange('title')}
                  value={this.state.title}
                  label="Title"
                  placeholder="Please enter event title..."
                  error={this.state.errors.title}
                />
                <Textarea
                  onChange={this.onChange('description')}
                  value={this.state.description}
                  label="Description"
                  placeholder="Please enter event description..."
                  error={this.state.errors.description}
                />
                <DatetimeInput
                  onChange={this.onChange('eventDateTime')}
                  value={this.state.eventDateTime}
                  label="Date and Time"
                  placeholder="Please enter the date and time of the event..."
                  error={this.state.errors.eventDateTime}
                />
                <LocationInput
                  onChange={this.onChange('location')}
                  value={this.state.location}
                  label="Location"
                  placeholder="Please enter the location of the event..."
                />
                <div className="field is-grouped">
                  <div className="control">
                    <button className="button is-text" type="button" onClick={this.props.onClose}>Cancel</button>
                  </div>
                  <div className="control">
                    <button className="button is-link" type="submit">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createEvent: (eventData) => dispatch(eventActions.create(eventData))
  }
}

export default connect(null, mapDispatchToProps)(CreateEventModal)
