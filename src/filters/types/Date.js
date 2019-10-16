import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

import Select from '../../utils/Select'
import { Date as DateInput } from 'mireco'
import { ISO_8601_DATE_FORMAT } from 'mireco/constants'

/**
 * Filter input used to pass date values either fixed
 * or relative to the current date
 */
export default class DateComponent extends React.Component {
  static propTypes = {
    /** Function to be called when value changes */
    onChange: PropTypes.func,
    /** Current filter value */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({value: PropTypes.string, label: PropTypes.string}),
    ]),
    /** Selected comparison */
    comparison: PropTypes.string.isRequired,
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
    /** Object of custom react-select styles */
    selectStyles: PropTypes.object,
  }

  static defaultProps = {
    relativeDateOptions: [
      {value: 'today', label: 'Today'},
      {value: 'week_start', label: 'Beginning of this week'},
      {value: 'month_start', label: 'Beginning of this month'},
      {value: 'year_start', label: 'Beginning of this year'},
    ],
    selectStyles: {},
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
    const { value, relativeDateOptions, comparison, fixedComparison, selectStyles } = this.props
    let date
    if (value === null) {
      date = null
    } else if (value instanceof Date && value.isValid()) {
      date = format(value, ISO_8601_DATE_FORMAT)
    } else if (typeof value === 'string') {
      date = value
    }
    let dateChoice
    if (comparison === fixedComparison.value) {
      dateChoice = (
        <DateInput
          placeholder={date}
          classNames={{
            container: 'objectlist-input__container',
            overlayWrapper: 'objectlist-input__daypicker',
            overlay: '',
          }}
          value={date}
          onChange={this.props.onChange}
          className="uptick-MIRECO"
          rightHang
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
          selectStyles={selectStyles}
        />
      )
    }
    return dateChoice
  }
}
