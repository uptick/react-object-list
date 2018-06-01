import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import {FILTER_BASE_TYPE} from '../utils/proptypes'
import { sortByName } from '../utils'
import { valueEqual } from '../utils/functions'

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

  state = {
    quickFilters: [],
  }

  static getDerivedStateFromProps = (props, state) => {
    let quickFilters = this.props.filters.filter((filter) => {
      return (!(filter.active) && !filter.alwaysVisible)
    })
    quickFilters = quickFilters.sort(sortByName)
    return ({quickFilters})
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !valueEqual(this.state.quickFilters, nextState.quickFilters)
  }

  render() {
    const {quickFilters} = this.state
    if (quickFilters.length === 0) { return null }

    return (
      <Select
        openOnFocus
        value={null}
        options={quickFilters}
        valueKey="filterKey"
        labelKey="name"
        onChange={this.props.addFilter}
        placeholder="Add Filter"
        className="objectlist-select-filter"
        menuStyle={{maxHeight: '500px'}}
        menuContainerStyle={{maxHeight: '500px'}}
      />
    )
  }
}

export default SelectFilters
