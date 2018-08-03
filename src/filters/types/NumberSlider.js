import React from 'react'
import PropTypes from 'prop-types'

/**
 * Filter input used to pass a range of integers
 * i.e. Greater Than 20
 */
class NumberSlider extends React.Component {
  static propTypes = {
    /** Highest number that can be selected */
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Lowest number that can be selected */
    min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Current value of filter */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Function to call when value changed */
    onChange: PropTypes.func,
    /** True if logarithmic value increase enabled */
    logarithmic: PropTypes.bool,
    /** Base to use for logarithmic increase */
    logbase: PropTypes.number,
    /** Decimal places allowed */
    precision: PropTypes.number,
  }

  static defaultProps = {
    value: '',
    min: 0,
    max: 100,
    logarithmic: false,
    logbase: 10,
    precision: 0,
  }

  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      currentValue: props.value || props.min,
      sliderValue: props.value ? this.getValueForSlider(props.value) : props.min,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({currentValue: nextProps.value})
    }
  }

  /**
   * Handles number input change.
   * Calls onChange with the current value.
   * @param  {event} event onChange event object
   */
  handleValueChange = (event) => {
    const {precision} = this.props
    const value = parseFloat(event.target.value)
    this.setState(
      () => ({
        currentValue: value,
        sliderValue: this.getValueForSlider(value),
      }), () => {
        const roundedValue = value.toFixed(precision)
        this.props.onChange(roundedValue)
      }
    )
  }

  /**
   * Handles slider onMouseUp.
   * Calls onChange with the current translated value.
   * @param  {event} event onMouseUp event object
   */
  handleSliderValueFinalise = (event) => {
    const {precision} = this.props
    const value = parseFloat(event.target.value)
    const finalValue = this.getValueFromSlider(value)
    this.setState(
      () => ({
        currentValue: finalValue,
        sliderValue: value,
      }), () => {
        const roundedValue = finalValue.toFixed(precision)
        this.props.onChange(roundedValue)
      }
    )
  }

  /**
   * Translates slider event value into valid output value
   * If not using logarithmic, this will be the same
   * @param  {number} input Number returned by slider
   * @return {number}       Number stored in state
   */
  getValueFromSlider = input => {
    const {min, max, logarithmic, logbase} = this.props
    let value = parseFloat(input)
    if (logarithmic) {
      const range = max - min
      const fractionAlongSlider = (value - min) / range
      value = (range * ((logbase ** fractionAlongSlider) - 1) / (logbase - 1)) + min
    }
    return value
  }

  /**
   * Translates current value into a slider value
   * If not using logarithmic this will be the same
   * @param  {number} input Actual value
   * @return {number}       Value translated for slider
   */
  getValueForSlider = input => {
    const {min, max, logarithmic, logbase} = this.props
    let value = parseFloat(input)
    if (logarithmic) {
      const logConst = 1 / Math.log(this.props.logbase)
      const range = max - min
      value = min + (range * logConst * Math.log(((value - min) * (logbase - 1) / range) + 1))
    }
    return value
  }

  /**
   * Handles slider change (on mouse up)
   * Sets state to final value
   */
  handleSliderValueChange = (event) => {
    const value = event.target.value
    this.setState(() => ({
      currentValue: this.getValueFromSlider(value),
      sliderValue: value,
    }))
  }

  render() {
    const {min, max, precision} = this.props
    const {currentValue, sliderValue} = this.state
    const step = 1 / (10 ** (precision))
    const parsedValue = parseFloat(currentValue)
    const display = isNaN(parsedValue) ? '' : parsedValue.toFixed(precision)
    const sliderRoundedValue = parseFloat(sliderValue).toFixed(10)
    return (
      <div className="objectlist-row objectlist-current-filter__active-status">
        <input
          type="number"
          className="objectlist-input objectlist-input__number-slider--number"
          min={min}
          max={max}
          value={display}
          onChange={this.handleValueChange}
          step={step}
        />
        <input
          type="range"
          className="objectlist-input__number-slider--slider"
          value={sliderRoundedValue}
          onChange={this.handleSliderValueChange}
          onMouseUp={this.handleSliderValueFinalise}
          step="any"
          min={min}
          max={max}
        />
      </div>
    )
  }
}

export default NumberSlider
