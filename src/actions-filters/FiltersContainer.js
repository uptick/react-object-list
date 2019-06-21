import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {FILTER_BASE_TYPE} from '../utils/proptypes'

class FiltersContainer extends Component {
  static propTypes = {
    /** array of potential filters that can be displayed inside the object-list */
    filters: PropTypes.arrayOf(PropTypes.shape({
      ...FILTER_BASE_TYPE,
      active: PropTypes.bool,
    })),
    /** callback containing {filterKey, comparison, value} for the individual filter */
    updateFilter: PropTypes.func,
    /** callback to remove a filter from the active list of filters */
    removeFilter: PropTypes.func,
    /** icons to use */
    icons: PropTypes.object,
    /** Object of custom react-select styles */
    selectStyles: PropTypes.object,
  }
  static defaultProps = {
    filters: [],
    activeFilters: [],
    icons: {},
    selectStyles: {},
  }

  renderFilter = (filter, i) => {
    const { Renderer, filterKey, loadOptions, value, ...props } = filter
    const { removeFilter, updateFilter, icons, selectStyles } = this.props
    return (
      <Renderer
        key={`filter-${filterKey}-${i}`}
        filterKey={filterKey}
        value={value}
        onChange={updateFilter}
        removeFilter={removeFilter}
        loadOptions={loadOptions ? loadOptions.bind(filter) : undefined} // eslint-disable-line react/jsx-no-bind
        icons={icons}
        selectStyles={selectStyles}
        {...props}
      />
    )
  }

  render() {
    return (
      <div className="objectlist--grow">
        {this.props.filters.filter(filter => filter.active).map(this.renderFilter)}
      </div>
    )
  }
}

export default FiltersContainer
