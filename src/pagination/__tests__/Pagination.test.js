import React from 'react'
import { snapshotTest } from 'utils/tests'
import Pagination from '../Pagination.js'

jest.mock('../Page', () => 'Page')

describe('Pagination', () => {
  const dummyLoader = <h4>Loading</h4>
  const defaultProps = {
    goToPage: jest.fn(),
    page: 1,
    perPage: 10,
    maxPages: 10,
    count: 100,
    itemPluralName: 'snakes',
  }
  describe('Snapshots', () => {
    it('has one page', () => {
      snapshotTest(<Pagination {...defaultProps} count={1} />)
    })
    it('is on first page', () => {
      snapshotTest(<Pagination {...defaultProps} />)
    })
    it('is on last page', () => {
      snapshotTest(<Pagination {...defaultProps} page={10} />)
    })
    it('is loading', () => {
      snapshotTest(<Pagination {...defaultProps} loading />)
    })
    it('has loading icon', () => {
      snapshotTest(<Pagination {...defaultProps} loading LoadingIcon={dummyLoader} />)
    })
    it('has more than maxPages', () => {
      snapshotTest(<Pagination {...defaultProps} maxPages={2} />)
    })
  })
})
