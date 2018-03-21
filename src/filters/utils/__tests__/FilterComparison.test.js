import React from 'react'
import { snapshotTest } from 'utils/tests'
import FilterComparison from '../FilterComparison'

jest.mock('react-select')

describe('FilterComparison', () => {
  const baseProps = {
    onChange: jest.fn(),
    value: 'test',
    options: [{value: 'test', label: 'Test This'}],
  }
  describe('Snapshots', () => {
    it('renders default', () => {
      snapshotTest(<FilterComparison {...baseProps} />)
    })
  })
})
