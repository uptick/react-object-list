import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { action } from '@storybook/addon-actions'

import OptionalFields from './OptionalFields'

const defaultProps = {
  extraColumns: ['a', 'b'],
  optionalFields: [
    {dataKey: 'a', header: 'Apple'},
    {dataKey: 'c', header: 'Cat'},
    {dataKey: 'd', header: 'Dragon'},
    {dataKey: 'e', header: 'Elephant'},
    {dataKey: 'f', header: 'Frappuccino'},
    {dataKey: 'g', header: 'Grizzly Bear'},
    {dataKey: 'h', header: 'Heaps Good Ay'},
    {dataKey: 'i', header: 'I\'m just waitin\' for a mate'},
  ],
  updateColumns: action('updateColumns'),
}

storiesOf('object-list/OptionalFields', module)
  .addDecorator((story, context) => withInfo(
    'Optional fields dropdown selector'
  )(story)(context))
  .add('default view', () => (
    <div style={{width: '100%', height: '50px'}}>
      <span style={{float: 'right'}}>
        <OptionalFields {...defaultProps} />
      </span>
    </div>
  ))
