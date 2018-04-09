import React, { Component } from 'react'

class AttachmentItem extends Component {
  constructor () {
    super()

    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete (e) {
    e.preventDefault()
    this.props.deleteAttachment()
  }

  render () {
    return (
      <div className="card">
        <div className="card-header">
          <div className="card-header-title is-centered">
            {
              this.props.attachment.loading
              ? (
                <span className="icon"><i className="fa fa-spinner fa-spin"></i></span>
              )
              : null
            }
            <span>{this.props.attachment.Title}</span>
          </div>
        </div>
        {
          !this.props.attachment.loading
          ? (
            <div className="card-footer">
              <a className="card-footer-item" target="_blank" href={this.props.attachment.getURL}>Download</a>
              <a className="card-footer-item has-text-danger" onClick={this.handleDelete}>Delete</a>
            </div>
          )
          : null
        }
      </div>
    )
  }
}

export default AttachmentItem
