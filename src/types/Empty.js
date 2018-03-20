import React from 'react'
import PropTypes from 'prop-types'

/**
 * Returns a span tag representing an empty element/content on the page
 */
class Empty extends React.Component {
  static defaultProps = {
    emptyText: '-',
  }
  static propTypes = {
    emptyText: PropTypes.string,
  }
  render() {
    return (<span className="text-muted">{this.props.emptyText}</span>)
  }
}

export default Empty
