import React from 'react'
import { snapshotTest } from 'utils/tests'
import FilterLabel from '../FilterLabel'



describe('FilterLabel', () => {
  const baseProps = {
    label: 'test',
  }
  describe('Snapshots', () => {
    it('renders default', () => {
      snapshotTest(<FilterLabel {...baseProps} />)
    })
  })
})
