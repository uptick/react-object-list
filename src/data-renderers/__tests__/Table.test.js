import React from 'react'
import { snapshotTest } from 'utils/tests'
import Table from '../Table'

jest.mock('../TableHeader', () => 'TableHeader')

describe('Table', () => {
  describe('Snapshots', () => {
    const props = {
      columns: [
        {
          dataKey: 'name',
          header: 'Name',
          item: ({row: {attributes: {name}}}) => name,
          optional: false,
          sortable: true,
        },
        [{
          dataKey: 'age',
          header: 'Age',
          item: ({row: {attributes: {age}}}) => (<span>{age}</span>),
          optional: false,
          sortable: true,
        },
        {
          dataKey: 'gender',
          header: 'Gender',
          item: ({row: {attributes: {gender}}}) => gender,
          optional: false,
          sortable: true,
        }],
      ],
      columnWidths: {'age_gender': {width: 50}},
      saveColumnWidth: jest.fn(),
      data: [
        {type: 'Person', attributes: {name: 'Sam', age: '25', gender: 'M'}},
        {type: 'Person', attributes: {name: 'Mary', age: '12', gender: 'F'}},
        {type: 'Person', attributes: {name: 'Q', age: '3', gender: '?'}},
        {type: 'Person', attributes: {name: 'Peter', age: '111', gender: 'FM'}},
        {type: 'Person', attributes: {name: 'Amy', age: '32', gender: 'Confused'}},
      ],
    }

    it('renders correctly', () => {
      snapshotTest(<Table {...props} />)
    })
  })
})
