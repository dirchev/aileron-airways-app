import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import attachmentActions from '../../action-creators/attachment'

import Input from '../inputs/Input'

export class CreateAttachmentModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      file: '',
      fileName: ''
    }

    this.onTitleChange = this.onTitleChange.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onTitleChange(value) {
    this.setState({ title: value })
  }

  onFileChange (e) {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value.split(/(\\|\/)/g).pop()
    })
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.createAttachment({
      Title: this.state.title,
      file: this.state.file
    })
    this.props.onClose()
  }

  render() {
    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <h5 className="is-size-5 mb-md">New Attachment</h5>
            <form onSubmit={this.onSubmit}>
              <div className="field">
                <Input onChange={this.onTitleChange} value={this.state.title} placeholder='Enter attachment title...'/>
              </div>
              <div className="field">
                <div className={`file is-fullwidth ${this.state.fileName ? 'has-name' : ''}`}>
                  <label className="file-label">
                    <input className="file-input" type="file" onChange={this.onFileChange} value={this.state.value} />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fa fa-upload"></i>
                      </span>
                      <span className="file-label">
                        Choose a file…
                      </span>
                    </span>
                    {
                      this.state.fileName
                      ? (<span className="file-name">{this.state.fileName}</span>)
                      : null
                    }
                  </label>
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
    )
  }
}

CreateAttachmentModal.propTypes = {
  createAttachment: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

var mapDispatchToProps = function (dispatch, oldProps) {
  return {
    createAttachment: function (data) {
      console.log(oldProps);
      dispatch(attachmentActions.create({...data, TimelineEventId: oldProps.EventId}))
    }
  }
}


export default connect(null, mapDispatchToProps)(CreateAttachmentModal)
