import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

export default class Overlay extends Component {
  static propTypes = {
    /** loading status used if data is loaded asynchronously  */
    status: PropTypes.oneOf(['loading', 'error', 'done']),
  }

  static defaultProps = {
    status: 'done',
  }

  render() {
    return (
      <div className={ClassNames('objectlist__overlay', {
        'objectlist__overlay--loading': this.props.status === 'loading',
      })} />
    )
  }
}
