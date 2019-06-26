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
    /** Object of custom react-select styles */
    selectStyles: PropTypes.object,
  }

  static defaultProps = {
    trueLabel: 'Yes',
    falseLabel: 'No',
    selectStyles: {},
  }

  onValueChange = newValue => {
    this.props.onChange(newValue.value)
  }

  render() {
    const {trueLabel, falseLabel, value, selectStyles} = this.props
    const trueOption = {value: 'True', label: trueLabel}
    const falseOption = {value: 'False', label: falseLabel}
    // TODO: The next line is here to be sure no matter what we pass in we use
    //  the correct value. However the real issue is probably elsewhere i.e. we
    //  should pass in the object, not True or False.
    const mappedValue = (value === 'True') ? trueOption : ((value === 'False') ? falseOption : null)
    return (
      <Choice
        options={[trueOption, falseOption]}
        onChange={this.onValueChange}
        value={mappedValue}
        selectStyles={selectStyles}
      />
    )
  }
}
