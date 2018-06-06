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
  }

  handleChange = newValue => this.props.onChange(newValue.value)

  render() {
    const {options, value} = this.props
    return (
      <div className="objectlist-current-filter__filter-comparison">
        <Select
          options={options}
          value={value}
          onChange={this.handleChange}
          clearable={false}
        />
      </div>
    )
  }
}

export default FilterComparison
