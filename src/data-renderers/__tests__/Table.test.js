import React from 'react'
import { shallow } from 'enzyme'
import { snapshotTest } from 'utils/tests'
import Table from '../Table'
import { getVisibleColumns, setColumnLabels } from '../../utils/functions'

jest.mock('../TableHeader', () => 'TableHeader')
jest.mock('../Overlay', () => 'Overlay')
jest.mock('../../types', () => ({AllSelector: 'AllSelector', Selector: 'Selector'}))

describe('Table', () => {
  const props = {
    select: jest.fn(),
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
  describe('Snapshots', () => {
    it('renders default', () => {
      snapshotTest(<Table {...props} select={null} />)
    })
    it('can select items', () => {
      snapshotTest(<Table {...props} />)
    })
  })
  describe('Lifecycle', () => {
    it('componentWillReceiveProps', () => {
      const newProps = {
        columns: [
          {
            dataKey: 'firstname',
            header: 'First Name',
            item: ({row: {attributes: {name}}}) => name,
            optional: false,
            sortable: true,
          },
          [{
            dataKey: 'years',
            header: 'Age in Years',
            item: ({row: {attributes: {age}}}) => (<span>{age}</span>),
            optional: false,
            sortable: true,
          }],
        ],
        meta: {
          extraColumns: ['firstname'],
        },
      }
      const instance = shallow(<Table {...props} />)
      instance.instance().setState({columns: []})
      instance.setProps(newProps)
      expect(instance.instance().state.columns).toEqual(
        getVisibleColumns(setColumnLabels(newProps.columns), newProps.meta.extraColumns)
      )
    })
  })
  describe('Functions', () => {
    it('handles select all', () => {
      spyOn(props, 'select')
      const instance = shallow(<Table {...props} />).instance()
      instance.handleToggleSelectAll()
      expect(props.select).toHaveBeenCalledWith(props.data.map(row => row.id))
    })
  })
})
