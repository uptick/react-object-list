import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { action } from '@storybook/addon-actions'

import List from './List'

const data = [
  {
    'key': '1',
    'user': 'Jane Doe',
    'header': 'User information',
    'item': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    'key': '2',
    'user': 'Random Account',
    'header': 'User information',
    'item': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    'key': '3',
    'user': 'James Smith',
    'header': 'User information',
    'item': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
]

const customRenderer = (props) => {
  const paleGrey = '#B8BDBF'
  return (
    <li style={{listStyle: 'none', border: `1px solid ${paleGrey}`, padding: '2rem', marginBottom: '1rem'}}>
      <a onClick={action(`Go to list item: ${props.data.key}`)} className="pull-right">
        View
      </a>
      <h5>{props.data.header}</h5>
      <p><i className="fa fa-user" /> {props.data.user}</p>
      <p style={{color: `${paleGrey}`, marginBottom: '1rem'}}>
        {props.data.item !== null ? props.data.item : 'N/A'}
      </p>
    </li>
  )
}

storiesOf('object-list/Data Renderers/List Renderer', module)
  .addDecorator((story, context) => withInfo(
    'Component used for displaying list items'
  )(story)(context))
  .add('default Renderer', () => {
    const columns = [
      {
        dataKey: '1',
        header: 'Item 1',
        sortable: false,
        optional: false,
      },
      {
        dataKey: '2',
        header: 'Item 2',
        sortable: false,
        optional: false,
      },
      {
        dataKey: '3',
        header: 'Item 3',
        sortable: false,
        optional: true,
      },
    ]

    const data = [
      {
        '1': 'Lorem Ipsum is simply dummy text',
        '2': 'Lorem Ipsum is simply dummy text',
        '3': 'Should not display',
        url: 'https://uptickhq.com',
      },
      {
        '1': 'Lorem Ipsum is simply dummy text (card 2)',
        '2': 'Lorem Ipsum is simply dummy text (card 2)',
        '3': 'Should not display',
      },
    ]

    return <List columns={columns} data={data} />
  })
  .add('single item', () => {
    const singleItem = data.slice(0, 1)
    return <List data={singleItem} Renderer={customRenderer} />
  })
  .add('loading', () => {
    return <List data={data} Renderer={customRenderer} status="loading" />
  })
  .add('multiple items', () => {
    return <List data={data} Renderer={customRenderer} itemOnClick={action('clicked')} />
  })
