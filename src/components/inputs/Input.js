import React, { Component } from 'react'

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
    if (this.props.onKeyUp) eventHandlers.onKeyUp = wrap(this.props.onKeyUp)
    if (this.props.onKeyDown) eventHandlers.onKeyDown = wrap(this.props.onKeyDown)
    if (this.props.onKeyPress) eventHandlers.onKeyPress = wrap(this.props.onKeyPress)
    return eventHandlers
  }

  render () {
    let controlClassNames = ['control']
    if (this.props.iconLeft) controlClassNames.push('has-icons-left')
    if (this.props.iconRight) controlClassNames.push('has-icons-right')
    controlClassNames = controlClassNames.join(' ')
    return (
      <div className="field">
        {
          this.props.label
          ? (
              <label className="label">{this.props.label}</label>
          )
          : null
        }
        <div className={controlClassNames}>
          <input className="input" type={this.props.type} placeholder={this.props.placeholder} value={this.props.value} {...this.getEventHandlers()}/>
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
        {/* <p className="help is-success">This username is available</p> */}
      </div>
    )
  }
}

Input.defaultProps = {
  className: '',
  type: 'text',
  value: null
}

export default Input
