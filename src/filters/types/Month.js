import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import MonthPicker from 'react-month-picker'

/**
 * Filter input used to pass month and year values
 */
class Month extends React.Component {
  static propTypes = {
    /** Current filter value */
    value: PropTypes.instanceOf(moment),
    /** Minimum year that can be selected */
    minYear: PropTypes.number,
    /** Maximum year that can be selected */
    maxYear: PropTypes.number,
    /** Display format of the value */
    format: PropTypes.string,
    /** Function to call when value changes */
    onChange: PropTypes.func,
  }

  static defaultProps = {
    value: moment(),
    format: 'MMM YYYY',
    minYear: moment().year() - 1,
    maxYear: moment().year() + 1,
  }

  state = {
    textValue: this.props.value ? this.props.value.format(this.props.format) : '',
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({textValue: nextProps.value ? nextProps.value.format(nextProps.format) : ''})
    }
  }

  /**
   * Handles text input value changes
   * Parses the current value sets it to textValue.
   * If it is a valid date, calls onChange with the
   * unix ms representation of that date, else null.
   */
  handleTextChange = () => {
    const textValue = this.refs.textInput.value
    let monthValue
    this.setState(() => ({textValue: textValue}))
    // use the moment option strict=true to prevent excessive preemptive parsing
    const parsedMonth = moment(textValue, this.props.format, true)
    if (parsedMonth.isValid()) {
      monthValue = parsedMonth
    } else {
      monthValue = null
    }
    this.props.onChange(monthValue)
  }

  /**
   * Handles month selection in the MonthPicker
   * Gets date using month and year supplied.
   * Sets textValue to the monthValue
   * formatted accoring to format passed in in props.
   * If it is a valid date, calls onChange with the
   * unix ms representation of that date, else null.
   * @param  {number} newYear  Year selected
   * @param  {number} newMonth Month selected
   */
  handleValueChange = (newYear, newMonth) => {
    const parsedMonth = moment({year: newYear, month: newMonth - 1})
    this.setState(() => ({textValue: parsedMonth.format(this.props.format)}))
    this.props.onChange(parsedMonth)
  }

  handleClick = () => {
    this.refs.monthPicker.show()
  }

  render() {
    const monthDict = {}
    if (this.props.value !== null) {
      monthDict.year = this.props.value.year()
      monthDict.month = this.props.value.month() + 1
    }
    return (
      <MonthPicker
        ref="monthPicker"
        value={monthDict}
        years={{
          min: this.props.minYear,
          max: this.props.maxYear,
        }}
        onChange={this.handleValueChange}
        lang={{
          months: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
        }}
      >
        <input
          ref="textInput"
          type="text"
          className="objectlist-input objectlist-input--wide"
          placeholder="Select month"
          onClick={this.handleClick}
          onChange={this.handleTextChange}
          value={this.state.textValue}
        />
      </MonthPicker>
    )
  }
}

export default Month
