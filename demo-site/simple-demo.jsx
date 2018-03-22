import React from 'react'
import ReactDom from 'react-dom'
import ObjectList from 'react-object-list'

const mockData = require('./demo.data.json').slice(0, 5)

ReactDom.render(
  <ObjectList
    columns={[
      [
        {dataKey: 'first_name', header: 'First Name'},
        {dataKey: 'last_name', header: 'Last Name'},
      ],
      {dataKey: 'email', header: 'Email'},
      {dataKey: 'gender', header: 'Gender'},
    ]}
    data={mockData}
    meta={{
      totalCount: mockData.length,
    }}
    favouritesEnabled={false}
  />,
  document.querySelector('div.demo-mount-simple')
)
