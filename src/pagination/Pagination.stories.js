import React from 'react'
import { action } from '@storybook/addon-actions'
import { boolean, number } from '@storybook/addon-knobs'

import Pagination from './Pagination'

const props = {
  page: 3,
  perPage: 5,
  maxPages: 3,
  count: 42,
  loading: false,
  itemPluralName: 'buildings',
  LoadingIcon: <i className="fas fa-circle-notch fa-spin" />,
}

export default {
  title: 'object-list/Pagination',
  component: Pagination,
}

export const Default = (args) => {
  return <Pagination
  {...props}
  count={number('count', props.count, {range: true, min: 1, max: 100, step: 1})}
  maxPages={10}
  loading={boolean('loading', props.loading)}
  goToPage={action('Setting page to')}
/>
}

export const Loading = (args) => (
  <Pagination
      {...props}
      loading
      goToPage={action('Setting page to')}
  />
)

export const Interactive = () => {
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
}
