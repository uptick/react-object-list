import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'
import DatePart from './DatePart'
import Empty from './Empty'
import {SHORTDATE_FORMAT} from '../utils'

/**
 * Displays a date relative to the current time eg. "4 days ago" or "in 3 days"
 * alongside the date passed in
 */
class RelativeDate extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    /** display the date passed in as well as the relative time period */
    showDate: PropTypes.bool,
  }

  static defaultProps = {
    showDate: true,
  }

  render() {
    const date = Moment(this.props.value)
    const isValid = date.isValid()
    if (isValid) {
      return (
        <div>
          <div>
            {Moment(this.props.value).fromNow()}
          </div>
          {this.props.showDate && (
            <div className="text-muted">
              <DatePart value={this.props.value} outputFormat={SHORTDATE_FORMAT} />
            </div>
          )}
        </div>
      )
    }
    return (<Empty />)
  }
}
export default RelativeDate
