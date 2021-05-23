import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-docs'
import { action } from '@storybook/addon-actions'

import ActionsFiltersContainer from './ActionsFiltersContainer'
import * as importedFilters from '../filters'

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
    active: true,
    name,
    ...props,
  }
})

storiesOf('object-list/ActionsFiltersContainer', module)
  .addDecorator((story, context) => withInfo(
    'Container to render filters and actions section'
  )(story)(context))
  .add('default view', () => (
    <ActionsFiltersContainer
      filters={filters}
      meta={{
        totalCount: 573489,
      }}
      columns={[{dataKey: 'favouriteColour', header: 'Favourite Colour', optional: true}]}
      numSelected={3}
      updateColumns={action('updateColumns')}
      updateFilter={action('Update filter')}
      removeFilter={action('Remove filter')}
      itemSingleName="octopus"
      itemPluralName="octopi"
    />
  )).add('has one item', () => (
    <ActionsFiltersContainer
      filters={filters}
      meta={{
        totalCount: 1,
      }}
      itemSingleName="thing"
      itemPluralName="things"
      columns={[{dataKey: 'favouriteColour', header: 'Favourite Colour', optional: true}]}
      numSelected={0}
      updateColumns={action('updateColumns')}
      updateFilter={action('Update filter')}
      removeFilter={action('Remove filter')}
    />
  )).add('has custom actions', () => {
    const downloadSomething = ({numSelected, itemPluralName, key}) => <a key={key} href="http://thecatapi.com/api/images/get?format=src&type=gif">Download {numSelected} {itemPluralName}</a>
    const aButton = ({numSelected, itemPluralName, key}) => <button key={key} onClick={action('Button clicked')}>Pat {numSelected} {itemPluralName}</button>
    return (
      <ActionsFiltersContainer
        meta={{
          totalCount: 573489,
        }}
        numSelected={3}
        itemPluralName="cats"
        itemSingleName="cat"
        updateColumns={action('updateColumns')}
        updateFilter={action('Update filter')}
        removeFilter={action('Remove filter')}
        customActions={[downloadSomething, aButton]}
        deselectAll={action('Select all items')}
      />
    )
  }).add('has search', () => {
    return (
      <ActionsFiltersContainer
        filters={filters}
        searchKey="SearchFilter"
        meta={{
          totalCount: 573489,
        }}
        numSelected={3}
        showBulkActionsButton
        itemPluralName="dogs"
        itemSingleName="dog"
        updateColumns={action('updateColumns')}
        updateFilter={action('Update filter')}
        removeFilter={action('Remove filter')}
      />
    )
  }).add('has search with value', () => {
    return (
      <ActionsFiltersContainer
        filters={filters.map(x => {
          if (x.filterKey === 'SearchFilter') return {...x, value: 'I am looking for this'}
          return x
        })}
        searchKey="SearchFilter"
        meta={{
          totalCount: 573489,
        }}
        numSelected={3}
        showBulkActionsButton
        itemPluralName="mouses"
        itemSingleName="mouse"
        updateColumns={action('updateColumns')}
        updateFilter={action('Update filter')}
        removeFilter={action('Remove filter')}
      />
    )
  })
