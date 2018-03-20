import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { action } from '@storybook/addon-actions'
import * as importedFilters from './filters'

import {
  ObjectList,
} from '.'

const baseProps = {
  updatePage: action('Update page'),
  updateColumns: action('Update columns'),
  updateFilter: action('Update filters'),
}

const filters = Object.entries(importedFilters).map(([name, filter]) => {
  const props = {}
  switch (name) {
    case 'RemoteChoiceFilter':
    case 'RemoteMultiChoiceFilter':
      props.loadOptions = action('loadOptions')
  }

  return {
    Renderer: filter,
    filterKey: name,
    active: false,
    name,
    props,
  }
})
const mockData = [
  {id: 1, name: 'Bob', age: 45, favouriteColour: 'blue'},
  {id: 2, name: 'Jim', age: 34, favouriteColour: 'red'},
  {id: 3, name: 'Jack', age: 16, favouriteColour: 'green'},
  {id: 4, name: 'Helen', age: 9, favouriteColour: 'orange'},
  {id: 5, name: 'Eva', age: 35, 'favouriteColour': 'yellow'},
  {id: 6, name: 'Mary', age: 18, 'favouriteColour': 'pink'},
  {id: 7, name: 'Dan', age: 92, favouriteColour: 'black'},
  {id: 8, name: 'Jo', age: 72, favouriteColour: 'white'},
  {id: 9, name: 'Wayne', age: 68, favouriteColour: 'aqua'},
  {id: 10, name: 'Dylan', age: 27, favouriteColour: 'purple'},
  {id: 11, name: 'Nina', age: 51, favouriteColour: 'maroon'},
  {id: 12, name: 'Lucy', age: 2, favouriteColour: 'grey'},
]

storiesOf('npm-list', module)
  .addDecorator((story, context) => withInfo(
    'Main list component'
  )(story)(context))
  .add('loading', () => (
    <ObjectList
      {...baseProps}
      columns={[
        {dataKey: 'name', header: 'Name', sortable: true},
        {dataKey: 'age', header: 'Age (years)', sortable: true},
      ]}
      data={mockData}
      setSort={action('Set sort')}
      status="loading"
      filters={filters}
    />
  ))
  .add('ready', () => (
    <ObjectList
      {...baseProps}
      columns={[
        {dataKey: 'name', header: 'Name', sortable: true},
        {dataKey: 'age', header: 'Age (years)', sortable: true},
      ]}
      data={mockData}
      setSort={action('Set sort')}
      status="done"
      filters={filters}
    />
  ))
  .add('has multiple pages', () => (
    <ObjectList
      {...baseProps}
      columns={[
        {dataKey: 'name', header: 'Name', sortable: true},
        {dataKey: 'age', header: 'Age (years)', sortable: true},
      ]}
      meta={{
        totalCount: 200,
        perPage: 20,
        currentPage: 1,
      }}
      data={mockData}
      setSort={action('Set sort')}
      status="done"
      filters={filters}
    />
  ))
  .add('has everything', () => (
    <ObjectList
      {...baseProps}
      columns={[
        {dataKey: 'name', header: 'Name', sortable: true},
        {dataKey: 'age', header: 'Age (years)', sortable: true},
        {dataKey: 'favouriteColour', header: 'Favourite Colour', optional: true},
      ]}
      meta={{
        totalCount: 200,
        perPage: 20,
        currentPage: 1,
        extraColumns: ['favouriteColour'],
      }}
      data={mockData}
      setSort={action('Set sort')}
      status="done"
      filters={filters.map((f, i) => ({
        ...f,
        active: !!(i % 2),
      }))}
      searchKey="text_contains"
    />
  ))
  .add('has optional fields', () => (
    <ObjectList
      {...baseProps}
      columns={[
        {dataKey: 'name', header: 'Name', sortable: true},
        {dataKey: 'age', header: 'Age (years)', sortable: true},
        {dataKey: 'favouriteColour', header: 'Favourite Colour', optional: true},
      ]}
      meta={{
        totalCount: 200,
        perPage: 20,
        currentPage: 1,
        extraColumns: [],
      }}
      data={mockData}
      setSort={action('Set sort')}
      status="done"
      filters={filters}
    />
  ))
  .add('has active filters', () => (
    <ObjectList
      {...baseProps}
      columns={[
        {dataKey: 'name', header: 'Name', sortable: true},
        {dataKey: 'age', header: 'Age (years)', sortable: true},
      ]}
      meta={{
        totalCount: 200,
        perPage: 20,
        currentPage: 1,
      }}
      data={mockData}
      setSort={action('Set sort')}
      status="done"
      filters={filters.map((f, i) => ({
        ...f,
        active: !!(i % 2),
      }))}
    />
  ))
  .add('can select items', () => (
    <ObjectList
      {...baseProps}
      columns={[
        {dataKey: 'name', header: 'Name', sortable: true},
        {dataKey: 'age', header: 'Age (years)', sortable: true},
      ]}
      meta={{
        totalCount: 200,
        perPage: 20,
        currentPage: 1,
      }}
      data={mockData}
      setSort={action('Set sort')}
      status="done"
      filters={filters}
      selectItems={action('Select items')}
    />
  ))
  .add('can select all', () => {
    const mockSelection = {}
    mockData.forEach(row => {
      mockSelection[row.id] = true
    })
    return (
      <ObjectList
        {...baseProps}
        columns={[
          {dataKey: 'name', header: 'Name', sortable: true},
          {dataKey: 'age', header: 'Age (years)', sortable: true},
        ]}
        meta={{
          totalCount: 200,
          perPage: 20,
          currentPage: 1,
        }}
        data={mockData}
        setSort={action('Set sort')}
        status="done"
        filters={filters}
        selection={mockSelection}
        selectItems={action('Select items')}
      />
    )
  })
  .add('has search key', () => (
    <ObjectList
      {...baseProps}
      columns={[
        {dataKey: 'name', header: 'Name', sortable: true},
        {dataKey: 'age', header: 'Age (years)', sortable: true},
      ]}
      meta={{
        totalCount: 200,
        perPage: 20,
        currentPage: 1,
      }}
      data={mockData}
      setSort={action('Set sort')}
      status="done"
      filters={filters}
      searchKey="search"
    />
  ))
