import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'

/**
 * Filter input used to pass specific dates
 */
class Day extends React.Component {
  static propTypes = {
    /** Format used to send/read the date from the API */
    format: PropTypes.string,
    /** Function called when value changed */
    onChange: PropTypes.func,
    /** Current filter value */
    value: PropTypes.instanceOf(Moment),
  }

  static defaultProps = {
    format: 'DD-MM-YYYY',
    value: Moment(),
  }

  /**
   * Handles clicking on previous day button.
   * Calls onChange with the previous day.
   * @param  {MouseEvent} event onClick event
   */
  handlePreviousClick = (event) => {
    event.preventDefault()
    const newValue = this.props.value.clone().subtract(1, 'days')
    this.props.onChange(newValue)
  }

  /**
   * Handles clicking on next day button.
   * Calls onChange with the next day.
   * @param  {MouseEvent} event onClick event
   */
  handleNextClick = (event) => {
    event.preventDefault()
    const newValue = this.props.value.clone().add(1, 'days')
    this.props.onChange(newValue)
  }

  render() {
    return (
      <div className="objectlist-dayfilter">
        <button className="objectlist-button" onClick={this.handlePreviousClick}>
          &larr; Previous
        </button>
        <h3 className="objectlist-dayfilter__day-name">{this.props.value.format('dddd MMMM Do YYYY')}</h3>
        <button className="objectlist-button" onClick={this.handleNextClick}>
          Next &rarr;
        </button>
      </div>
    )
  }
}

export default Day
