import React from 'react'
import PropTypes from 'prop-types'
import Empty from './Empty'
import { currency } from './utils'

/**
 * Display a number provided in a currency format
 */
class Currency extends React.Component {
  static propTypes = {
    /** the value as a string or number to format as a currency */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }

  render() {
    if (typeof this.props.value === 'undefined' || this.props.value === null) {
      return (<Empty {...this.props} />)
    }
    return (<span>{currency(this.props.value)}</span>)
  }
}

export default Currency
