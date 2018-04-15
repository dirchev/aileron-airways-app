import React, { Component } from 'react'
import Datetime from 'react-datetime'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'

class DatetimeInput extends Component {
  constructor () {
    super()
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange (date) {
    if (!date) return this.props.onChange() // invalid date, do not change
    var momentDate = moment(date)
    if (!momentDate.isValid()) return // invalid date, do not change
    this.props.onChange(momentDate.toISOString())
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
            open={true}
            value={moment(this.props.value)}
            renderInput={() => null}
            onChange={this.handleOnChange}
            autoFocus={this.props.autoFocus}
            inputProps={{className: 'input', ..._.omit(this.props, ['onChange', 'value', 'defaultValue'])}}
          />
        </div>
      </div>
    )
  }
}

DatetimeInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
}

DatetimeInput.defaultProps = {
  value: null
}

export default DatetimeInput
