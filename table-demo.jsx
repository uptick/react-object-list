import React from 'react'
import ReactDom from 'react-dom'

import ObjectList from 'react-object-list'
import {TextContainsFilter} from 'react-object-list/filters'

const mockData = require('./demo.data.json')
const columns = [
  [
    {dataKey: 'first_name', header: 'First Name', sortable: true},
    {dataKey: 'last_name', header: 'Last Name', sortable: true, optional: true},
  ],
  {dataKey: 'email', header: 'Email', sortable: true},
  {dataKey: 'gender', header: 'Gender', sortable: true},
  {dataKey: 'ip_address', header: 'IPv6', sortable: true, optional: true},
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
    const currentSort = sortKeys.find(key => key.key === sortKey)
    let value = true
    if (currentSort !== undefined && currentSort.value === true) {
      value = false
    }
    sortKeys = [{key: sortKey, value}].concat(sortKeys.filter((k) => k.key !== sortKey))

    return {
      sortKeys,
      data: prevState.data.sort((a, b) => {
        for (let i = 0; i < sortKeys.length; i++) {
          const order = sortKeys[i].value ? 1 : -1
          if (a[sortKeys[i].key] > b[sortKeys[i].key]) return -1 * order
          if (a[sortKeys[i].key] < b[sortKeys[i].key]) return 1 * order
        }
        return 0
      }),
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
    console.log(filterKey)
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
          const regex = RegExp(activeFilters[i].value, 'i')
          return regex.test(row[activeFilters[i].filterKey])
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

const mount = document.querySelector('div.demo-mount-table')
ReactDom.render(
  <TableDemo />,
  mount
)
