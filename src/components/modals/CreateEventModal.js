import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import Input from '../inputs/Input'
import Textarea from '../inputs/Textarea'
import eventActions from '../../action-creators/event'
import Datetime from 'react-datetime'


class CreateEventModal extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      eventDateTime: '',
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(field) {
    return (value) => {
      this.setState({ [field]: value })
    }
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.createEvent({
      TimelineId: this.props.timelineId,
      Title: this.state.title,
      Description: this.state.description,
      EventDateTime: this.state.eventDateTime ? moment(this.state.eventDateTime).toISOString() : null
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
                />
                <Textarea
                  onChange={this.onChange('description')}
                  value={this.state.description}
                  label="Description"
                  placeholder="Please enter event description..."
                />
                {/* <Input
                  onChange={this.onChange('eventDateTime')}
                  type='datetime-local'
                  value={this.state.eventDateTime}
                  label="Date and Time"
                  placeholder="Please enter when the event happened..."
                /> */}
                <div>
                  <div class='mb-md'>
                    <b>Date and Time</b>
                    <Datetime
                      onChange={this.onChange('eventDateTime')}
                      //type='react-datetime' 
                      value={this.state.eventDateTime}
                    />
                  </div>
                </div>
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
