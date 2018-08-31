import React from 'react'
import { shallow } from 'enzyme'
import { snapshotTest } from 'utils/tests'
import Table from '../Table'
import { getVisibleColumns, annotateSpans } from '../../utils/functions'

jest.mock('../TableHeader', () => 'TableHeader')
jest.mock('../Overlay', () => 'Overlay')
jest.mock('../../types/AllSelector', () => 'AllSelector')
jest.mock('../../types/Selector', () => 'Selector')

describe('Table', () => {
  const props = {
    select: jest.fn(),
    columns: [
      {
        dataKey: 'name',
        header: 'Name',
        item: ({row: {attributes: {name}}}) => name,
        optional: false,
        sortKey: '🎂',
      },
      [{
        dataKey: 'age',
        header: 'Age',
        item: ({row: {attributes: {age}}, key}) => (<span key={key}>{age}</span>),
        optional: false,
        sortKey: '🥧',
      },
      {
        dataKey: 'gender',
        header: 'Gender',
        item: ({row: {attributes: {gender}}}) => gender,
        optional: false,
        sortKey: '🍩',
      }],
    ],
    columnWidths: {'age_gender': {width: 50}},
    saveColumnWidth: jest.fn(),
    data: [
      {id: 1, type: 'Person', attributes: {name: 'Sam', age: '25', gender: 'M'}},
      {id: 2, type: 'Person', attributes: {name: 'Mary', age: '12', gender: 'F'}},
      {id: 3, type: 'Person', attributes: {name: 'Q', age: '3', gender: '?'}},
      {id: 4, type: 'Person', attributes: {name: 'Peter', age: '111', gender: 'FM'}},
      {id: 5, type: 'Person', attributes: {name: 'Amy', age: '32', gender: 'Confused'}},
    ],
  }
  describe('Snapshots', () => {
    it('renders default', () => {
      snapshotTest(<Table {...props} select={null} />)
    })
    it('can select items', () => {
      snapshotTest(<Table {...props} />)
    })
    it('can click on items', () => {
      snapshotTest(<Table {...props} itemOnClick={jest.fn()} />)
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
            sortKey: '🍪',
          },
          [{
            dataKey: 'years',
            header: 'Age in Years',
            item: ({row: {attributes: {age}}, key}) => (<span key={key}>{age}</span>),
            optional: false,
            sortable: '🍮',
          }],
        ],
        meta: {
          extraColumns: ['firstname'],
        },
      }
      const instance = shallow(<Table {...props} />)
      instance.instance().setState({columns: []})
      instance.setProps(newProps)
      const visibleColumns = getVisibleColumns(newProps.columns, newProps.meta.extraColumns)
      annotateSpans(visibleColumns)
      expect(instance.instance().state.columns).toEqual(visibleColumns)
    })
  })
  describe('Functions', () => {
    it('handles select all', () => {
      spyOn(props, 'select')
      const instance = shallow(<Table {...props} />).instance()
      instance.handleSelectAll()
      expect(props.select).toHaveBeenCalledWith(props.data.map(row => row.id))
    })
    it('handles deselect all', () => {
      spyOn(props, 'select')
      const allSelection = {}
      props.data.forEach(row => { allSelection[row.id] = true })
      const instance = shallow(
        <Table
          {...props}
          numSelected={props.data.length}
          selection={allSelection}
        />
      ).instance()
      instance.handleDeselectAll()
      expect(props.select).toHaveBeenCalledWith(null)
    })
    it('handles select remaining', () => {
      spyOn(props, 'select')
      const mockSelection = {1: true, 3: true}
      const instance = shallow(
        <Table
          {...props}
          numSelected={2}
          selection={mockSelection}
        />
      ).instance()
      instance.handleSelectAll()
      expect(props.select).toHaveBeenCalledWith([2, 4, 5])
    })
  })
})
