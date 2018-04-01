import React, { Component } from 'react'
import Datetime from 'react-datetime'
import moment from 'moment'
import _ from 'lodash'

class DatetimeInput extends Component {
  constructor () {
    super()
    this.renderInput = this.renderInput.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange (dateMoment) {
    this.props.onChange(dateMoment.toISOString())
  }

  render () {
    return (
      <div className="field">
        {
          this.props.label
          ? (<label className="label">{this.props.label}</label>)
          : null
        }
        <div className="control">
          <Datetime
            value={moment(this.props.value)}
            renderInput={this.renderInput}
            onChange={this.handleOnChange}
            autoFocus={this.props.autoFocus}
            inputProps={{className: 'input', ..._.omit(this.props, ['onChange', 'value', 'defaultValue'])}}
          />
        </div>
      </div>
    )
  }

  renderInput (props) {
    return (
      <input {...props} />
    )
  }
}

DatetimeInput.defaultProps = {
  value: null
}

export default DatetimeInput
