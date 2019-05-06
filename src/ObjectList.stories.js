import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { action } from '@storybook/addon-actions'
import * as importedFilters from './filters'
import FontAwesomeIcons from './icons/FontAwesome'

import ObjectList from '.'

const baseProps = {
  updatePage: action('Update page'),
  updateColumns: action('Update columns'),
  updateFilter: action('Update filters'),
  addFilter: action('Add filter'),
  icons: FontAwesomeIcons(5),
}

const filters = Object.entries(importedFilters).map(([name, filter]) => {
  const props = {}
  switch (name) {
    case 'RemoteChoiceFilter':
    case 'RemoteMultiChoiceFilter':
      props.loadOptions = action('loadOptions')
      break
    case 'SearchFilter':
      props.filterKey = 'search'
      props.name = ''
  }

  return {
    Renderer: filter,
    filterKey: name,
    active: false,
    name,
    ...props,
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

storiesOf('object-list', module)
  .addDecorator((story, context) => withInfo(
    'Main list component'
  )(story)(context))
  .add('loading', () => (
    <ObjectList
      {...baseProps}
      columns={[
        {dataKey: 'name', header: 'Name', sortKey: 'name'},
        {dataKey: 'age', header: 'Age (years)', sortKey: 'age'},
      ]}
      meta={{
        totalCount: 200,
        perPage: 20,
        currentPage: 1,
      }}
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
        {dataKey: 'name', header: 'Name', sortKey: 'name'},
        {dataKey: 'age', header: 'Age (years)', sortKey: 'age'},
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
        {dataKey: 'name', header: 'Name', sortKey: 'name'},
        {dataKey: 'age', header: 'Age (years)', sortKey: 'age'},
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
  .add('has everything', () => {
    const downloadSomething = ({numSelected, itemPluralName, key}) => <a key={key} href="http://thecatapi.com/api/images/get?format=src&type=gif">Download {numSelected} {itemPluralName}</a>
    const aButton = ({numSelected, itemPluralName, key}) => <button key={key} onClick={action('Button clicked')}>Pat {numSelected} {itemPluralName}</button>
    const mockSelection = {}
    mockData.forEach(row => {
      mockSelection[row.id] = true
    })
    return (
      <ObjectList
        {...baseProps}
        columns={[
          {dataKey: 'name', header: 'Name', sortKey: 'name'},
          {dataKey: 'age', header: 'Age (years)', sortKey: 'age'},
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
        selection={mockSelection}
        searchKey="search"
        removeFilter={action('removeFilter')}
        customActions={[downloadSomething, aButton]}
        selectItems={action('selecting items')}
      />)
  })
  .add('has error', () => (
    <ObjectList
      {...baseProps}
      columns={[
        {dataKey: 'name', header: 'Name', sortKey: 'name'},
        {dataKey: 'age', header: 'Age (years)', sortKey: 'age'},
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
      downloadUrl="localhost/download"
      searchKey="text_contains"
      error={new Error('The computer wizards have run out of mana. Please try again later.')}
    />
  ))
  .add('has optional fields', () => (
    <ObjectList
      {...baseProps}
      columns={[
        {dataKey: 'name', header: 'Name', sortKey: 'name'},
        {dataKey: 'age', header: 'Age (years)', sortKey: 'age'},
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
        {dataKey: 'name', header: 'Name', sortKey: 'name'},
        {dataKey: 'age', header: 'Age (years)', sortKey: 'age'},
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
      removeFilter={action('removeFilter')}
    />
  ))
  .add('can select items', () => (
    <ObjectList
      {...baseProps}
      columns={[
        {dataKey: 'name', header: 'Name', sortKey: 'name'},
        {dataKey: 'age', header: 'Age (years)', sortKey: 'age'},
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
          {dataKey: 'name', header: 'Name', sortKey: 'name'},
          {dataKey: 'age', header: 'Age (years)', sortKey: 'age'},
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
  .add('all selected', () => {
    return (
      <ObjectList
        {...baseProps}
        columns={[
          {dataKey: 'name', header: 'Name', sortKey: 'name'},
          {dataKey: 'age', header: 'Age (years)', sortKey: 'age'},
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
        selection={'all'}
        selectItems={action('Select items')}
      />
    )
  })
  .add('has search key', () => (
    <ObjectList
      {...baseProps}
      columns={[
        {dataKey: 'name', header: 'Name', sortKey: 'name'},
        {dataKey: 'age', header: 'Age (years)', sortKey: 'age'},
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
      removeFilter={action('Remove filter')}
      searchKey="search"
    />
  ))
