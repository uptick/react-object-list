import React from 'react'
import PropTypes from 'prop-types'
import Choice from './Choice'

/**
 * Filter input used to pass boolean values
 */
export default class Boolean extends React.Component {
  static propTypes = {
    /** Label used for true option */
    trueLabel: PropTypes.string,
    /** Label used for false option */
    falseLabel: PropTypes.string,
    /** Function called when value changed */
    onChange: PropTypes.func,
    /** Current value of filter */
    value: PropTypes.string,
  }

  static defaultProps = {
    trueLabel: 'Yes',
    falseLabel: 'No',
  }

  onValueChange = newValue => {
    this.props.onChange(newValue.value)
  }

  render() {
    const {trueLabel, falseLabel, value} = this.props
    const trueOption = {value: 'True', label: trueLabel}
    const falseOption = {value: 'False', label: falseLabel}
    return (
      <Choice
        options={[trueOption, falseOption]}
        onChange={this.onValueChange}
        value={value}
      />
    )
  }
}
