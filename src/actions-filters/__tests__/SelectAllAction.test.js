import React from 'react'
import { snapshotTest } from 'utils/tests'
import SelectAllAction from '../SelectAllAction'

jest.mock('../../utils', () => ({
  loadingSpinner: () => 'loadingSpinner',
}))

describe('<SelectAllAction />', () => {
  describe('Snapshot', () => {
    it('does not render with no props', () => {
      snapshotTest(<SelectAllAction />)
    })
    it('shows both select all and deselect', () => {
      const props = {
        selectAllLink: true,
        loading: false,
        count: 5,
        numSelected: 3,
        itemCount: 3,
      }
      snapshotTest(<SelectAllAction {...props} />)
    })
    it('shows deselect all when some of the items are selected', () => {
      const props = {
        selectAllLink: true,
        loading: false,
        count: 5,
        numSelected: 2,
        itemCount: 3,
      }
      snapshotTest(<SelectAllAction {...props} />)
    })
    it('shows deselect all when all the items are selected', () => {
      const props = {
        selectAllLink: true,
        loading: false,
        count: 5,
        numSelected: 5,
        itemCount: 3,
      }
      snapshotTest(<SelectAllAction {...props} />)
    })
    it('shows a spinner when select all is pending', () => {
      const props = {
        selectAllLink: true,
        loading: true,
        count: 5,
        numSelected: 3,
        itemCount: 3,
      }
      snapshotTest(<SelectAllAction {...props} />)
    })
  })
})
