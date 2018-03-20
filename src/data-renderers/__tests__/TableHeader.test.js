import React from 'react'
import { snapshotTest } from 'utils/tests'
import TableHeader from '../TableHeader'
jest.mock('../HeaderField', () => 'HeaderField')

describe('Table Header', () => {
  describe('Snapshots', () => {
    const headerItem = {
      dataKey: 'header_sort_key',
      header: 'Header Text',
      item: jest.fn(),
      sortable: true,
      optional: false,
    }

    it('renders correctly', () => {
      const props = {
        headerItems: {...headerItem},
        setSort: jest.fn(),
      }
      snapshotTest(<TableHeader {...props} />)
    })
    it('renders correctly with multiple header items', () => {
      const props = {
        headerItems: [{...headerItem}, {...headerItem, header: 'Header Two Text', key: 'header_two_key'}],
        setSort: jest.fn(),
      }
      snapshotTest(<TableHeader {...props} />)
    })
  })
})
