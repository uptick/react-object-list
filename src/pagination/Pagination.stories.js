import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean, number } from '@storybook/addon-knobs/react'

import Pagination from './Pagination'

const props = {
  page: 3,
  perPage: 5,
  maxPages: 3,
  count: 42,
  loading: false,
}

storiesOf('npm-list/Pagination', module)
  .addDecorator((story, context) => withInfo(
    'Pagination used at the bottom of the NPMList'
  )(story)(context))
  .addDecorator(withKnobs)
  .add('default view', () => (
    <Pagination
      {...props}
      count={number('count', props.count, {range: true, min: 1, max: 100, step: 1})}
      maxPages={10}
      loading={boolean('loading', props.loading)}
      goToPage={action(`Setting page to`)}
      itemPluralName="buildings"
    />
  ))
  .add('loading', () => (
    <Pagination
      {...props}
      loading
      goToPage={action(`Setting page to`)}
    />
  ))
  .add('interactive', () => {
    class PaginationWrapper extends React.Component {
      state = {...props}
      goToPage = (page) => {
        this.setState(() => ({page}))
        action('Setting page to')(page)
      }
      render() {
        return <Pagination {...this.state} goToPage={this.goToPage} />
      }
    }
    return (<PaginationWrapper />)
  })
