import React from 'react'
import PropTypes from 'prop-types'

import Select from '../../utils/Select'

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
    /** If remote true, this is set to automatically load options */
    autoload: PropTypes.bool,
  }

  static defaultProps = {
    multi: false,
    remote: false,
    value: null,
    placeholder: 'Any value',
    valueKey: 'value',
    labelKey: 'label',
    optionRenderer: null,
  }

  state = {
    value: null,
    fetchScheduled: null,
  }

  componentDidMount() {
    this.updateValue(this.props.value)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.updateValue(nextProps.value)
    }
  }

  async updateValue(nextValue) {
    if (typeof nextValue !== 'object' || nextValue === null) {
      this.setState({value: nextValue})
    } else {
      const value = Array.isArray(nextValue) ? nextValue : [nextValue]
      for (const i in value) {
        if (typeof value[i] === 'object') {
          const label = await value[i][this.props.labelKey]
          value[i][this.props.labelKey] = label
        }
      }
      this.setState({value: this.props.multi ? value : value[0]})
    }
  }

  /**
   * Handles value change and checks selected option(s)
   * type is correct before calling on change with the values
   * @param  {object||object[]} newValue Just selected options
   */
  handleChange = newValue => {
    const {onChange, multi} = this.props
    if (!multi) {
      if (Array.isArray(newValue)) {
        newValue = newValue[0]
      }
      onChange(newValue)
    } else {
      if (!Array.isArray(newValue)) {
        newValue = [newValue]
      }
      onChange(newValue)
    }
  }

  scheduleLoadOptions = (searchTerm, callback) => {
    if (this.state.fetchScheduled) {
      clearTimeout(this.state.fetchScheduled)
    }
    this.setState(() => ({
      fetchScheduled: setTimeout(
        // eslint-disable-next-line
        () => this.props.loadOptions(searchTerm, callback), 450
      ),
    }))
  }

  render() {
    const {
      options, multi, placeholder,
      valueKey, labelKey, optionRenderer,
      remote, autoload,
    } = this.props
    const { value } = this.state
    const SelectComponent = remote ? Select.Async : Select
    return (
      <SelectComponent
        multi={multi}
        autoload={autoload}
        options={options}
        loadOptions={this.scheduleLoadOptions}
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
