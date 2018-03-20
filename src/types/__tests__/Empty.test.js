import React from 'react'
import {
  snapshotTest,
  configureEnzymeAdapter,
} from 'utils/tests'
import { Empty } from '../'


describe('Empty type', () => {
  it('snapshot test', () => {
    const testValues = [
      {},
      {emptyText: 'test'},
    ]
    testValues.forEach(testValue => {
      snapshotTest(<Empty {...testValue} />)
    })
  })
})
