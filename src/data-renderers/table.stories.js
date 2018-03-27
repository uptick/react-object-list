import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { action } from '@storybook/addon-actions'

import {
  Table,
} from '.'

const mockData = [
  {id: 1, name: 'Bob', age: 45, hobby: 'horse riding'},
  {id: 2, name: 'Jim', age: 34, hobby: 'horse riding'},
  {id: 3, name: 'Jack', age: 16, hobby: 'horse riding'},
  {id: 4, name: 'Helen', age: 9, hobby: 'horse riding'},
  {id: 5, name: 'Eva', age: 35, hobby: 'horse riding'},
  {id: 6, name: 'Mary', age: 18, hobby: 'horse riding'},
  {id: 7, name: 'Dan', age: 92, hobby: 'horse riding'},
  {id: 8, name: 'Jo', age: 72, hobby: 'volleyball'},
  {id: 9, name: 'Wayne', age: 68, hobby: 'horse riding'},
  {id: 10, name: 'Dylan', age: 27, hobby: 'horse riding'},
  {id: 11, name: 'Nina', age: 51, hobby: 'horse riding'},
  {id: 12, name: 'Lucy', age: 2, hobby: 'table tennis'},
]

const customRenderer = ({row: {id}, value}) => {
  return (<strong key={`name-${id}`} style={{color: 'purple'}}>{value}</strong>)
}
const anotherCustomRenderer = ({row: {id}, value}) => {
  return (
    <div key={`age-${id}`} style={{height: '15px', width: `${value}%`, background: 'lightgrey'}} />
  )
}

storiesOf('object-list/Data Renderers/Table', module)
  .addDecorator((story, context) => withInfo(
    'Component used to render data in a tabular format'
  )(story)(context))
  .add('simple', () => (
    <Table
      columns={[
        {dataKey: 'name', header: 'Name', sortable: false},
        {dataKey: 'age', header: 'Age (years)', sortable: false},
        {dataKey: 'hobby', header: 'Hobby', sortable: false},
      ]}
      data={mockData}
    />
  )).add('loading', () => (
    <Table
      columns={[
        {dataKey: 'name', header: 'Name', sortable: false},
        {dataKey: 'age', header: 'Age (years)', sortable: false},
        {dataKey: 'hobby', header: 'Hobby', sortable: false},
      ]}
      data={mockData}
      status="loading"
    />
  )).add('has sortable headers', () => (
    <Table
      columns={[
        {dataKey: 'name', header: 'Name', sortable: true, width: 50},
        {dataKey: 'age', header: 'Age (years)', sortable: true},
        {dataKey: 'hobby', header: 'Hobby', sortable: true},
      ]}
      saveColumnWidth={action('Save Column Width')}
      data={mockData}
      setSort={action('Set sort')}
    />
  )).add('has custom renderers', () => (
    <Table
      columns={[
        {dataKey: 'name', header: 'Name', sortable: true, item: customRenderer},
        {dataKey: 'age', header: 'Age (years)', sortable: true, item: anotherCustomRenderer},
      ]}
      data={mockData}
      setSort={action('Set sort')}
    />
  )).add('has selected items', () => (
    <Table
      columns={[
        {dataKey: 'name', header: 'Name', sortable: true, item: customRenderer},
        {dataKey: 'age', header: 'Age (years)', sortable: true, item: anotherCustomRenderer},
      ]}
      data={mockData}
      setSort={action('Set sort')}
      select={action('Select item')}
      selection={{4: true, 10: true}}
    />
  )).add('sorted header', () => (
    <Table
      meta={{sortKeys: [{sortKey: 'name', value: false}, {sortKey: 'age', value: true}]}}
      columns={[
        {dataKey: 'name', header: 'Name', sortable: true, item: customRenderer},
        {dataKey: 'age', header: 'Age (years)', sortable: true, item: anotherCustomRenderer},
      ]}
      data={mockData}
      setSort={action('Set sort')}
      select={action('Select item')}
      selection={{4: true, 10: true}}
    />
  ))
  .add('all selected', () => {
    const allSelection = {
      1: true,
      2: true,
      3: true,
      4: true,
      5: true,
      6: true,
      7: true,
      8: true,
      9: true,
      10: true,
      11: true,
      12: true,
    }
    return (
      <Table
        columns={[
          {dataKey: 'name', header: 'Name', sortable: true, item: customRenderer},
          {dataKey: 'age', header: 'Age (years)', sortable: true, item: anotherCustomRenderer},
        ]}
        data={mockData}
        setSort={action('Set sort')}
        select={action('Select item')}
        selection={allSelection}
      />
    )
  })
