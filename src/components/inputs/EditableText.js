import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from './Input'

class EditableText extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editMode: false,
      value: this.props.defaultValue,
      error: null
    }

    this.enableEditMode = this.enableEditMode.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetField = this.resetField.bind(this)
  }

  handleChange (value) {
    this.setState({
      value: value,
      error: this.props.validator(value)
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    if (this.props.error || this.props.validator(this.state.value))
      return this.setState({error: this.props.validator(this.state.value)})
    this.props.onChange(this.state.value)
    this.setState({editMode: false})
  }

  enableEditMode () {
    this.setState({editMode: !this.state.editMode, value: this.props.defaultValue, error: null})
  }

  resetField () {
    this.setState({editMode: false})
  }

  render () {
    if (this.state.editMode) {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="field is-grouped is-grouped-multiline">
            <Input doNotSetField={true} value={this.state.value} onChange={this.handleChange} autoFocus error={this.state.error}/>
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
      </span>
    )
  }
}

EditableText.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  validator: PropTypes.func.isRequired,
}

export default EditableText
