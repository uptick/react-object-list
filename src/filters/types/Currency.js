import React from 'react'
import PropTypes from 'prop-types'

/**
 * Filter input used to pass currency values
 */
class Currency extends React.Component {
  static propTypes = {
    /** Current value of filter */
    value: PropTypes.string,
    /** Currency symbol to be displayed */
    currencySymbol: PropTypes.string,
    /** Function called when value changed */
    onChange: PropTypes.func,
  }

  static defaultProps = {
    currencySymbol: '$',
  }

  /**
   * Handles value change and calls onChange with new value
   */
  handleValueChange = () => {
    this.props.onChange(this.refs.input.value)
  }

  render() {
    const {value, currencySymbol} = this.props
    return (
      <div className="apilist-currency-filter apilist-current-filter__active-status">
        <span className="apilist-currency-filter__symbol">{currencySymbol}</span>
        <input
          ref="input"
          type="text"
          className="apilist-input apilist-input--currency"
          value={value}
          onChange={this.handleValueChange}
        />
        <span className="apilist-currency-filter__decimal">.00</span>
      </div>
    )
  }
}

export default Currency
