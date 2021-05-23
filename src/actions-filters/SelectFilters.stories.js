import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-docs'
import { action } from '@storybook/addon-actions'

import SelectFilters from './SelectFilters'
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
    active: false,
    name,
    ...props,
  }
})

storiesOf('object-list/SelectFilters', module)
  .addDecorator((story, context) => withInfo(
    'Filters dropdown selector'
  )(story)(context))
  .add('default view', () => (
    <SelectFilters
      filters={filters}
      addFilter={action('addFilter')}
    />
  ))
