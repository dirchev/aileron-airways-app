import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Input extends Component {
  getEventHandlers () {
    var wrap = function (handler) {
      return (event) => {
        let value = event.target.value
        handler(value, event)
      }
    }
    var eventHandlers = {}
    if (this.props.onChange) eventHandlers.onChange = wrap(this.props.onChange)
    return eventHandlers
  }

  render () {
    let controlClassNames = ['control']
    if (this.props.iconLeft) controlClassNames.push('has-icons-left')
    if (this.props.iconRight) controlClassNames.push('has-icons-right')
    controlClassNames = controlClassNames.join(' ')
    var control = (
      <div className={controlClassNames}>
        <input
          className="input"
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
          {...this.getEventHandlers()}
          autoFocus={this.props.autoFocus}
        />
        {
          this.props.iconLeft
          ? (
            <span className="icon is-small is-left">
              <i className={this.props.iconLeft}></i>
            </span>
          )
          : null
        }
        {
          this.props.iconRight
          ? (
            <span className="icon is-small is-right">
              <i className={this.props.iconRight}></i>
            </span>
          )
          : null
        }
      </div>
    )
    if (this.props.label) {
      return (
        <div className="field">
          {
            this.props.label
            ? (
                <label className="label">{this.props.label}</label>
            )
            : null
          }
          {control}
        </div>
      )
    } else {
      return control
    }
  }
}

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.func,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  autoFocus: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
}

Input.defaultProps = {
  className: '',
  type: 'text',
  value: null
}

export default Input
