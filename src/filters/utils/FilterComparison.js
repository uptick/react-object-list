import React from 'react'
import PropTypes from 'prop-types'
import Select from '../../utils/Select'

class FilterComparison extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: Select.propTypes.value,
    })),
    value: Select.propTypes.value,
    onChange: PropTypes.func.isRequired,
    /** Object of custom react-select styles */
    selectStyles: PropTypes.object,
  }

  static defaultProps = {
    selectStyles: {},
  }

  handleChange = newValue => this.props.onChange(newValue.value)

  render() {
    const {options, value, selectStyles} = this.props
    return (
      <div className="objectlist-current-filter__filter-comparison">
        <Select
          options={options}
          value={options.find(x => x.value === value)}
          onChange={this.handleChange}
          clearable={false}
          selectStyles={selectStyles}
        />
      </div>
    )
  }
}

export default FilterComparison
