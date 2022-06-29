import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'
import DatePart from './DatePart'
import Empty from './Empty'
import {SHORTDATETIME_FORMAT} from '../utils'

/**
 * Displays a datetime relative to the current time eg. "4 days ago" or "in 3 hours"
 * alongside the datetime passed in
 */
class RelativeDateTime extends React.Component {
  static propTypes = {
    value: PropTypes.string,
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
          <div className="text-muted">
            <DatePart value={this.props.value} outputFormat={SHORTDATETIME_FORMAT} />
          </div>
        </div>
      )
    }
    return (<Empty />)
  }
}
export default RelativeDateTime
