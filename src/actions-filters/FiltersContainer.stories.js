import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-docs'
import { action } from '@storybook/addon-actions'

import FiltersContainer from './FiltersContainer'
import * as importedFilters from '../filters'

const filters = Object.entries(importedFilters).map(([name, filter]) => {
  const props = {}
  switch (name) {
    case 'RemoteChoiceFilter':
    case 'RemoteMultiChoiceFilter':
      props.loadOptions = action('loadOptions')
      break
    case 'DayFilter':
      props.name = null
      break
  }

  return {
    Renderer: filter,
    filterKey: name,
    active: true,
    name,
    ...props,
  }
})

storiesOf('object-list/FiltersContainer', module)
  .addDecorator((story, context) => withInfo(
    'Container to render all the filters underneath eachother'
  )(story)(context))
  .add('default view', () => (
    <FiltersContainer
      filters={filters}
      updateFilter={action('updateFilter')}
      removeFilter={action('removeFilter')}
    />
  ))
