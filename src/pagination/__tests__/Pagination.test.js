import React from 'react'
import { snapshotTest } from 'utils/tests'
import Pagination from '../Pagination.js'

jest.mock('../Page', () => 'Page')

describe('Pagination', () => {
  const defaultProps = {
    goToPage: jest.fn(),
    page: 1,
    perPage: 10,
    maxPages: 10,
    count: 100,
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
    it('has more than maxPages', () => {
      snapshotTest(<Pagination {...defaultProps} maxPages={2} />)
    })
  })
})
