import React from 'react'
import { snapshotTest } from '../../../utils/tests'
import { Currency } from '../'

describe('Currency type', () => {
  it('snapshot test', () => {
    const testValues = [
      {},
      {value: '254789043'},
      {value: 4672389},
    ]
    testValues.forEach(testValue => {
      snapshotTest(<Currency {...testValue} />)
    })
  })
})
