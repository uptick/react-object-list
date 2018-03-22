import React from 'react'
import ReactDom from 'react-dom'

import ObjectList from 'react-object-list'
import { List } from 'react-object-list/renderers'

const mockData = require('./demo.data.json').slice(0, 3)
const columns = [
  [
    {dataKey: 'first_name', header: 'First Name'},
    {dataKey: 'last_name', header: 'Last Name'},
  ],
  {dataKey: 'email', header: 'Email'},
  {dataKey: 'gender', header: 'Gender'},
]

class SimpleListDemo extends React.Component {
  render() {
    return <ObjectList
      columns={columns}
      data={mockData}
      DataRenderer={List}
      meta={{
        totalCount: mockData.length,
      }}
      favouritesEnabled={false}
    />
  }
}

const mount = document.querySelector('div.demo-mount-list')
ReactDom.render(
  <SimpleListDemo />,
  mount
)
