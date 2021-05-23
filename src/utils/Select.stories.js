import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-docs'

import Select from './Select'

storiesOf('object-list/Utils/Select', module)
  .addDecorator((story, context) => withInfo(
    'Wrapper for react-select to ensure consistency'
  )(story)(context))
  .add('has custom menu style', () => (
    <Select menuStyle={{border: '5px dashed blue'}} />
  ))
  .add('has custom menu container style', () => (
    <Select menuContainerStyle={{border: '5px solid red'}} />
  ))
