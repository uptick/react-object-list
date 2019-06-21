import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Select from '../utils/Select'
import {FILTER_BASE_TYPE} from '../utils/proptypes'
import {sortByName} from '../utils'

class SelectFilters extends Component {
  static propTypes = {
    /** array of potential filters that can be displayed inside the object-list */
    filters: PropTypes.arrayOf(PropTypes.shape({
      ...FILTER_BASE_TYPE,
      active: PropTypes.bool,
    })),
    /** callback to add a filter to the list of active filters */
    addFilter: PropTypes.func,
  }
  static defaultProps = {
    filters: [],
  }
  render() {
    if (this.props.filters.length === 0) { return null }

    let quickFilters = this.props.filters.filter(filter =>
      !filter.active && !filter.alwaysVisible
    )
    quickFilters = quickFilters.sort(sortByName)

    // There's something pretty odd happening with react-select v2 that
    // causes any option that itself contains an `options` field to use
    // that subfield instead of itself. WTF.
    // TODO: Check if this issue has been resolved in a later version.
    quickFilters = quickFilters.map(({options, ...rest}) => rest)

    return (
      <Select
        openOnFocus
        value={null}
        options={quickFilters}
        valueKey="filterKey"
        labelKey="name"
        onChange={this.props.addFilter}
        placeholder="Add filter"
        className="objectlist-select-filter"
      />
    )
  }
}

export default SelectFilters
