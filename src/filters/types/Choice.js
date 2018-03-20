import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

/**
 * Filter input for choice values
 */
class Choice extends React.Component {
  static propTypes = {
    /** If true, allow selection of multiple values */
    multi: PropTypes.bool,
    /** Function to be called when value changed */
    onChange: PropTypes.func.isRequired,
    /** Currently selected filter value */
    value: PropTypes.any,
    /** Placeholder text to display in input */
    placeholder: PropTypes.string,
    /** Options to choose from */
    options: PropTypes.arrayOf(PropTypes.object),
    /** Key to be used to identify label in options object */
    labelKey: PropTypes.string,
    /** Key to be used to identify value in options object */
    valueKey: PropTypes.string,
    /** Renderer to be used to display the options */
    optionRenderer: PropTypes.func,
    /** If true, data must be fetched */
    remote: PropTypes.bool,
    /** If remote true, this is called to load options */
    loadOptions: PropTypes.func,
  }

  static defaultProps = {
    multi: false,
    remote: false,
    value: null,
    placeholder: 'Any value',
    options: [],
    valueKey: 'value',
    labelKey: 'label',
    optionRenderer: null,
  }

  /**
   * Handles value change and checks selected option(s)
   * type is correct before calling on change with the values
   * @param  {object||object[]} newValue Just selected options
   */
  handleChange = newValue => {
    const {onChange, valueKey, multi} = this.props
    if (!multi) {
      if (Array.isArray(newValue)) {
        newValue = newValue[0]
      }
      onChange(newValue[valueKey])
    } else {
      if (!Array.isArray(newValue)) {
        newValue = [newValue]
      }
      onChange(newValue.map(x => x[valueKey]))
    }
  }

  render() {
    const {
      options, value, multi, placeholder,
      valueKey, labelKey, optionRenderer,
      remote, loadOptions,
    } = this.props
    const SelectComponent = remote ? Select.Async : Select
    return (
      <SelectComponent
        multi={multi}
        options={options}
        loadOptions={loadOptions}
        value={value}
        onChange={this.handleChange}
        placeholder={placeholder}
        valueKey={valueKey}
        labelKey={labelKey}
        optionRenderer={optionRenderer}
        className="objectlist-current-filter__active-status"
      />
    )
  }
}
export default Choice
