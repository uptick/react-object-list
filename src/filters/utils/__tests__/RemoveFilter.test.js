import React from 'react'
import { snapshotTest } from '../../../../utils/tests'
import RemoveFilter from '../RemoveFilter'

describe('RemoveFilter', () => {
  const baseProps = {
    onClick: jest.fn(),
  }
  describe('Snapshots', () => {
    it('renders default', () => {
      snapshotTest(<RemoveFilter {...baseProps} />)
    })
  })
})
