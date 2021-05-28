import React from 'react'
import Moment from 'moment'
import PropTypes from 'prop-types'

import { DATETIME_FORMAT } from '../utils'

/**
 * Presents timestamps in a human readable format
 * where by default the date and time components are shown
 */
class DateTime extends React.Component {
  static propTypes = {
    outputFormat: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.array, // array of dates, each formatted as a string
      PropTypes.object, // an object containing "start" and "end" dates as properties of the object. This is the same as providing two dates in array format
      PropTypes.string, // a single date formatted as a string
    ]),
    empty: PropTypes.string,
    /** the separator used when multiple dates are provided */
    seperator: PropTypes.string,
  }

  static defaultProps = {
    outputFormat: DATETIME_FORMAT,
    empty: '-',
    seperator: '-',
    value: null,
    dateOnly: false,
  }

  /**
   * Return date in specififed format if valid
   * @param  {Object} date Moment date object to be formatted
   * @return {string}      Formatted date string or empty
   */
  formatDateTime(date) {
    date = Moment.utc(date)
    if (date.isValid()) {
      return date.local().format(this.props.outputFormat)
    }
    return this.props.empty
  }

  /**
   * Return date range with dates formatted as specified
   * @param  {Array} dates List of dates to be formatted
   * @return {string}       Formatted date string
   */
  formatRange(dates) {
    let retString = ''
    dates.map((date, index) => {
      const dateString = `${this.formatDateTime(date)}`
      if (retString.search(dateString) === -1) {
        if (index > 0) {
          retString += ` ${this.props.seperator} `
        }
        retString += dateString
      }
    })
    return retString
  }

  render() {
    if (this.props.value) {
      let inner
      switch (typeof this.props.value) {
        case 'object':
          if (Array.isArray(this.props.value)) {
            inner = this.formatRange(this.props.value)
          } else if ('start' in this.props.value && 'end' in this.props.value) {
            inner = this.formatRange([
              this.props.value.start,
              this.props.value.end,
            ])
          }
          break
        case 'string':
          inner = `${this.formatDateTime(this.props.value)}`
          break
      }
      if (inner) {
        return <div>{inner}</div>
      }
    }
    return <div className="text-muted">{this.props.empty}</div>
  }
}

export default DateTime
