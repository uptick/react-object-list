import React from 'react'
import ReactDom from 'react-dom'

import ObjectList from 'react-object-list'
import {TextContainsFilter} from 'react-object-list/filters'

const mockData = require('./demo.data.json')
const columns = [
  [
    {dataKey: 'first_name', header: 'First Name', sortKey: 'first_name'},
    {dataKey: 'last_name', header: 'Last Name', sortKey: 'last_name', optional: true},
  ],
  {dataKey: 'email', header: 'Email', sortKey: 'email'},
  {dataKey: 'gender', header: 'Gender', sortKey: 'gender'},
  {dataKey: 'ip_address', header: 'IPv6', sortKey: 'ip_address', optional: true},
]

class TableDemo extends React.Component {
  state = {
    currentPage: 1,
    perPage: 7,
    totalCount: mockData.length,
    sortKeys: [],
    data: mockData.slice(0, 7),
    extraColumns: ['last_name'],
    filters: [{
      Renderer: TextContainsFilter,
      filterKey: 'first_name',
      active: false,
      name: 'First Name',
      props: {
        updateDelay: 0,
      },
    }],
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filters !== this.state.filters) {
      this.updateData(1)
    }
  }

  updatePage = currentPage => this.updateData(currentPage)
  updateSorting = sortKey => this.setState(prevState => {
    let sortKeys = [...prevState.sortKeys]
    const currentSort = sortKeys.find(sort => sort.sortKey === sortKey)
    let value = true
    if (currentSort !== undefined && currentSort.value === true) {
      value = false
    }
    sortKeys = [{sortKey: sortKey, value}].concat(sortKeys.filter((k) => k.sortKey !== sortKey))

    const offset = (prevState.currentPage - 1) * prevState.perPage
    return {
      sortKeys,
      data: mockData.sort((a, b) => {
        for (let i = 0; i < sortKeys.length; i++) {
          const order = sortKeys[i].value ? 1 : -1
          if (a[sortKeys[i].sortKey] > b[sortKeys[i].sortKey]) return -1 * order
          if (a[sortKeys[i].sortKey] < b[sortKeys[i].sortKey]) return 1 * order
        }
        return 0
      }).slice(offset, offset + prevState.perPage),
    }
  })
  updateColumns = columnKey => this.setState(prevState => {
    let extraColumns = [...prevState.extraColumns]
    if (extraColumns.includes(columnKey)) {
      extraColumns = extraColumns.filter(key => key !== columnKey)
    } else {
      extraColumns.push(columnKey)
    }
    return {extraColumns}
  })
  addFilter = newFilter => this.setState(prevState => {
    const filters = prevState.filters.map(filter => {
      if (filter.filterKey === newFilter.filterKey) {
        return {...filter, active: true}
      } else {
        return {...filter}
      }
    })
    return {filters}
  })
  removeFilter = filterKey => this.setState(prevState => {
    const filters = prevState.filters.map(filter => {
      if (filter.filterKey === filterKey) {
        return {...filter, active: false, value: ''}
      } else {
        return {...filter}
      }
    })
    return {filters}
  })
  updateFilter = ({filter: filterKey, comparison, value}) => this.setState(prevState => {
    const filters = prevState.filters.map(filter => {
      if (filter.filterKey === filterKey) {
        return {...filter, value, comparison}
      } else {
        return {...filter}
      }
    })
    return {filters}
  })
  updateData = (currentPage) => {
    let data = mockData
    const activeFilters = this.state.filters.filter(filter => filter.active)
    if (activeFilters.length > 0) { // filter data
      data = data.filter(row => {
        for (let i = 0; i < activeFilters.length; i++) {
          if (!activeFilters[i].value) { return true }
          const regex = RegExp(activeFilters[i].value, 'i')
          const result = regex.test(row[activeFilters[i].filterKey])
          const comparison = activeFilters[i].comparison || 'contains'
          return comparison === 'contains' ? result : !result
        }
        return false
      })
    }
    // paginate data
    const offset = (currentPage - 1) * this.state.perPage
    this.setState(prevState => ({
      totalCount: data.length,
      data: data.slice(offset, offset + prevState.perPage),
      currentPage,
    }))
  }

  render() {
    const { currentPage, perPage, totalCount, sortKeys, extraColumns, data } = this.state
    return <ObjectList
      columns={columns}
      data={data}
      updateSorting={this.updateSorting}
      filters={this.state.filters}
      meta={{
        currentPage,
        perPage,
        totalCount,
        sortKeys,
        extraColumns,
      }}
      updatePage={this.updatePage}
      maxPages={3}
      updateColumns={this.updateColumns}
      favouritesEnabled={false}
      addFilter={this.addFilter}
      removeFilter={this.removeFilter}
      updateFilter={this.updateFilter}
    />
  }
}

ReactDom.render(
  <TableDemo />,
  document.querySelector('div.demo-mount-table')
)
