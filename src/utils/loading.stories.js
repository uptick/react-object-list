import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

import {
  loadingSpinner,
} from '.'

storiesOf('object-list/Utils/Loading Icon', module)
  .addDecorator((story, context) => withInfo(
    'Loading spinner icon'
  )(story)(context))
  .add('loading', () => (
    <div>
      {['red', 'blue', 'yellow', 'green', 'purple', 'grey', null].map(colour => {
        const Spinner = loadingSpinner(colour)
        return <div key={colour}><h5>{colour}:</h5> {Spinner} </div>
      })}
    </div>
  ))
