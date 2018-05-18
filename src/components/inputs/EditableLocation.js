import React, { Component } from 'react'
import LocationInput from './LocationInput'

class EditableLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false,
      value: props.defaultValue
    }

    this.enableEditMode = this.enableEditMode.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetField = this.resetField.bind(this)
    this.removeLocation = this.removeLocation.bind(this)
  }

  handleChange(value) {
    this.setState({ value })
  }

  removeLocation (e) {
    e.preventDefault()
    this.setState({ value: null })
    // this.setState({ editMode: false })
    // this.props.onChange(null)
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

  render() {
    if (this.state.editMode) {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="control">
            <LocationInput value={this.state.value} onChange={this.handleChange} />
            <div className="control">
              <button type="submit" className="button is-link mr-sm"><i className="fa fa-send"></i></button>
              <button type="button" onClick={this.resetField} className="button is-link is-danger"><i className="fa fa-times"></i></button>
              {
                this.state.value
                ? (
                  <button type="button" onClick={this.removeLocation} className="button is-link is-danger pull-right">
                    <span className="icon">
                      <i className="fa fa-times"></i>
                    </span>
                    <span>
                      Remove Location
                    </span>
                  </button>
                ) : null
              }
            </div>
          </div>
        </form>
      )
    }
    return (
      <span>
        {this.props.children}
        <button className="button" onClick={this.enableEditMode}>{this.props.defaultValue ? 'Change' : 'Add'} Event Location</button>
      </span>
    )
  }

}

EditableLocation.defaultProps = {
  value: ''
}

export default EditableLocation
