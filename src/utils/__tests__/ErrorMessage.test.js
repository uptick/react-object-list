import React from 'react'
import { snapshotTest } from '../../../utils/tests'
import { ErrorMessage } from '../'

describe('Error Message', () => {
  it('default', () => {
    snapshotTest(<ErrorMessage />)
  })
  it('has error', () => {
    snapshotTest(<ErrorMessage error={new Error('Testing')} />)
  })
})
