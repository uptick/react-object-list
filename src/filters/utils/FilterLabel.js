import React from 'react'
import PropTypes from 'prop-types'

/**
 * Component to render label for filters
 */
class FilterLabel extends React.Component {
  static propTypes = {
    /** Text to render in the label */
    label: PropTypes.string.isRequired,
  }
  render() {
    return (
      <label className="objectlist-current-filter__filter-name">{this.props.label}:</label>
    )
  }
}

export default FilterLabel
