import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Pagination extends Component {
  constructor () {
    super()
    this.changePage = this.changePage.bind(this)
  }

  changePage (page) {
    return (e) => {
      e.preventDefault()
      this.props.onPageChange(page)
    }
  }

  render() {
    // if there is only one page - no need to show anything
    if (this.props.pages === 1) return null
    return (
      <nav className="pagination is-centered">
        {
          this.props.page !== 1
          ? <a onClick={this.changePage(this.props.page - 1)} className="pagination-previous">Previous page</a>
          : null
        }
        {
          this.props.page !== this.props.pages
          ? <a onClick={this.changePage(this.props.page + 1)} className="pagination-next">Next page</a>
          : null
        }
        <ul className="pagination-list">
          {
            this.renderPageLinks()
          }
        </ul>
      </nav>
    )
  }

  renderPageLinks () {
    var result = []
    for (var i = 1; i <= this.props.pages; i++) {
      result.push(
        <li key={i}><a onClick={this.changePage(i)} className={`pagination-link ${i === this.props.page ? 'is-current' : ''}`} >{i}</a></li>
      )
    }
    return result
  }
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}
export default Pagination
