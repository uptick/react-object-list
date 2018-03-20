import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
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
    onChange: action('Change filter'),
    name,
    props,
  }
})

storiesOf('npm-list/ActionsFiltersContainer', module)
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
      showBulkActionsButton
      updateColumns={action('updateColumns')}
      updateFilter={action('Update filters')}
    />
  )).add('has custom actions', () => {
    const downloadSomething = (props) => <a href="http://thecatapi.com/api/images/get?format=src&type=gif">Download {props.numSelected} {props.itemPluralName}</a>
    const aButton = (props) => <button onClick={action('Button clicked')}>Pat {props.numSelected} {props.itemPluralName}</button>
    return (
      <ActionsFiltersContainer
        meta={{
          totalCount: 573489,
        }}
        numSelected={3}
        showBulkActionsButton
        itemPluralName="cats"
        updateColumns={action('updateColumns')}
        updateFilters={action('Update filters')}
        customActions={[downloadSomething, aButton]}
      />
    )
  })
