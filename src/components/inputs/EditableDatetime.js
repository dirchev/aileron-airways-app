import React, { Component } from 'react'
import Datetime from 'react-datetime'
import moment from 'moment'
import _ from 'lodash'
import Input from './Input'
import DatetimeInput from './DatetimeInput'

class EditableDatetime extends Component {
  constructor (props) {
    super(props)
    this.state = {
    editMode: false,
    value: this.props.value
    }
    //this.renderInput = this.renderInput.bind(this)
    //this.handleChange = this.handleChange.bind(this)

    this.enableEditMode = this.enableEditMode.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetField = this.resetField.bind(this)

  }

  

  handleChange(value) {
    this.setState({ value })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onChange(this.state.value)
    this.setState({ editMode: false })
  }

  enableEditMode() {
    this.setState({ editMode: !this.state.editMode, value: this.props.defaultValue })
  }

  resetField() {
    this.setState({ editMode: false })
  }

  render () {
    if (this.state.editMode) {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="control">
            <DatetimeInput doNotSetField={true} value={this.state.value} onChange={this.handleChange} autoFocus/>
            <div className="control">
              <button type="submit" className="button is-link mr-sm"><i className="fa fa-send"></i></button>
              <button type="button" onClick={this.resetField} className="button is-link is-danger"><i className="fa fa-times"></i></button>
            </div>
          </div>
        </form>
      )
    }
    return (
      <span onClick={this.enableEditMode} className="editable-text">
        {this.props.children}
        <span className="tooltip"></span>
      </span>
    )
  }
}

 

EditableDatetime.defaultProps = {
  value: null
}

export default EditableDatetime
