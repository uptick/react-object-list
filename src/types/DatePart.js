import React from 'react'
import DateTime from './DateTime'

import {
  DATE_FORMAT,
} from '../utils'

/**
 * Presents date elements or timestamps in human readable format
 */
class DatePart extends React.Component {
  static defaultProps = {
    outputFormat: DATE_FORMAT,
  }
  render() {
    return (
      <DateTime
        {...this.props}
        dateOnly
      />
    )
  }
}

export default DatePart
