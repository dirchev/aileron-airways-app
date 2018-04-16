import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Input from '../inputs/Input'
import timelineActions from '../../action-creators/timeline'
import titleValidator from '../../validators/title'

export class CreateTimelineModal extends Component {
  constructor () {
    super()
    this.state = {
      title: '',
      errors: {
        title: null
      }
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange (value) {
    var newState = {
      title: value
    }
    this.setState({
      ...newState,
      errors: this.getErrors(newState)
    })
  }

  getErrors (state) {
    if (!state) state = this.state
    var errors = {
      title: titleValidator(state.title)
    }
    return errors
  }

  onSubmit (e) {
    e.preventDefault()
    if (_.some(_.values(this.getErrors()), (e) => e)) {
      return this.setState({errors: this.getErrors()})
    }
    this.props.createTimeline({Title: this.state.title})
    this.props.onClose()
  }

  render () {
    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="card">
            <div className="card-header">
              <div className="card-header-title">
                <h2>Create Timeline</h2>
              </div>
            </div>
            <div className="card-content">
              <form onSubmit={this.onSubmit}>
                <Input
                  autoFocus
                  onChange={this.onChange}
                  value={this.state.title}
                  label="Title"
                  placeholder="Please enter timeline title..."
                  error={this.state.errors.title}
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

CreateTimelineModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  createTimeline: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    createTimeline: (timelineData) => dispatch(timelineActions.create(timelineData))
  }
}

export default connect(null, mapDispatchToProps)(CreateTimelineModal)
