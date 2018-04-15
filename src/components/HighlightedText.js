import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class HighlightedText extends Component {
  getChildren () {
    // this.props.matches = [[1,3], [5,6]]
    // we need to hightlight from 1 to 3 and from 5 to 6 incl
    if (!_.isString(this.props.children)) return this.props.children
    if (!this.props.matches.length) return this.props.children
    var string = this.props.children
    var parts = []
    var lastIndex = 0
    this.props.matches.forEach(function (match) {
      if (match[0] !== lastIndex) parts.push(<span key={lastIndex + '-' + match[0]}>{string.slice(lastIndex, match[0])}</span>)
      parts.push(<span key={match[0] + '-' + match[1]} className="has-background-warning">{string.slice(match[0], match[1] + 1)}</span>)
      lastIndex = match[1] + 1
    })
    if (lastIndex !== string.length) {
      parts.push(<span key={lastIndex + '-' + (string.length)}>{string.slice(lastIndex)}</span>)
    }
    return parts
  }

  render () {
    return (
      <span>
        {this.getChildren()}
      </span>
    )
  }
}

HighlightedText.propTypes = {
  children: PropTypes.string.isRequired,
  matches: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
}

export default HighlightedText
