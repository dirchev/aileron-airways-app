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
          <textarea
            className="textarea"
            type={this.props.type}
            placeholder={this.props.placeholder}
            value={this.props.value}
            rows={this.props.rows}
            colums={this.props.columns}
            {...this.getEventHandlers()}
            autoFocus={this.props.autoFocus}
          />
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
