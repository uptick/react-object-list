import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {FILTER_BASE_TYPE} from '../utils/proptypes'

const filterPropType = PropTypes.shape({
  ...FILTER_BASE_TYPE,
  active: PropTypes.bool,
})

class FiltersContainer extends Component {
  static propTypes = {
    /** array of potential filters that can be displayed inside the object-list */
    filters: PropTypes.oneOfType(PropTypes.arrayOf(filterPropType), filterPropType),
    /** callback containing {filterKey, comparison, value} for the individual filter */
    updateFilter: PropTypes.func,
    /** callback to remove a filter from the active list of filters */
    removeFilter: PropTypes.func,
  }
  static defaultProps = {
    filters: [],
  }

  state = {
    activeFilters: [],
    allFilters: [],
  }

  static getDerivedStateFromProps(props, state) {
    const { filters } = props
    if (filters !== state.allFilters) {
      return {
        activeFilters: (
          Array.isArray(filters) ? filters : [filters]
        ).filter(filter => filter.active),
        allFilters: filters,
      }
    }
    return null
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.allFilters !== nextState.allFilters)
  }

  renderFilter = (filter, i) => {
    const { Renderer, filterKey, loadOptions, value, ...props } = filter
    return (
      <Renderer
        key={`filter-${filterKey}-${i}`}
        filterKey={filterKey}
        value={value}
        onChange={this.props.updateFilter}
        removeFilter={this.props.removeFilter}
        loadOptions={loadOptions ? loadOptions.bind(filter) : undefined} // eslint-disable-line react/jsx-no-bind
        {...props}
      />
    )
  }

  render() {
    const {activeFilters} = this.state
    return (
      <div className="objectlist--grow">
        {activeFilters.map(this.renderFilter)}
      </div>
    )
  }
}

export default FiltersContainer
