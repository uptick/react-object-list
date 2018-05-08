import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

import Select from 'react-select'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import {
  formatDate,
  parseDate,
} from 'react-day-picker/moment'

/**
 * Filter input used to pass date values either fixed
 * or relative to the current date
 */
class DateComponent extends React.Component {
  static propTypes = {
    /** Function to be called when value changes */
    onChange: PropTypes.func,
    /** Current filter value */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
      PropTypes.shape({value: PropTypes.string, label: PropTypes.string}),
    ]),
    /** Selected comparison */
    comparison: PropTypes.string.isRequired,
    /** Format in which dates are inputted by/displayed to user */
    inputFormat: PropTypes.string,
    /** Comparison used for fixed date */
    fixedComparison: PropTypes.shape({
      /** Value passed back */
      value: PropTypes.any,
      /** Value shown to user */
      label: PropTypes.string,
    }),
    /** Valid options for relative dates */
    relativeDateOptions: PropTypes.arrayOf(PropTypes.shape({
      /** Value passed back */
      value: PropTypes.string,
      /** Value shown to user */
      label: PropTypes.string,
    })),
  }

  static defaultProps = {
    inputFormat: 'DD/MM/YYYY',
    relativeDateOptions: [
      {value: 'today', label: 'Today'},
      {value: 'week_start', label: 'Beginning of this week'},
      {value: 'month_start', label: 'Beginning of this month'},
      {value: 'year_start', label: 'Beginning of this year'},
    ],
  }

  /**
   * Handles fixed date value changes.
   * If value is not a valid date, sets to null.
   * Calls onChange with new value
   * @param  {Object} newValue Date to change to, moment object
   */
  handleDateValueChange = (newValue) => {
    if (newValue === 'Invalid date') {
      newValue = null
    }
    this.props.onChange(newValue)
  }

  /**
   * Handles relative date value changes.
   * Calls onChange with new value if valid
   * @param  {Object} newValue Relative date option to change to
   */
  handleDateRelativeChange = (newValue) => {
    if (Array.isArray(newValue)) { return }
    this.props.onChange(newValue)
  }

  render() {
    const { value, inputFormat, relativeDateOptions, comparison, fixedComparison } = this.props
    const date = value === null ? '' : moment(value).format(inputFormat)
    let dateChoice
    if (comparison === fixedComparison.value) {
      dateChoice = (
        <DayPickerInput
          placeholder={date}
          format="DD/MM/YYYY"
          classNames={{
            container: 'objectlist-input__container',
            overlayWrapper: 'objectlist-input__daypicker',
            overlay: '',
          }}
          onDayChange={this.handleDateValueChange}
          clickUnselectsDay
          formatDate={formatDate}
          parseDate={parseDate}
          value={date}
          dayPickerProps={{
            fixedWeeks: true,
          }}
        />
      )
    } else {
      dateChoice = (
        <Select
          options={relativeDateOptions}
          onChange={this.handleDateRelativeChange}
          {...(value ? {value: value} : {})}
          clearable={false}
          className="objectlist-current-filter__active-status"
        />
      )
    }
    return dateChoice
  }
}
export default DateComponent
