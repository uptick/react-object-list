import React from 'react'
import {
  snapshotTest,
  configureEnzymeAdapter,
} from 'utils/tests'
import { BooleanType } from '../'


describe('BooleanType', () => {
  it('snapshot test', () => {
    const testValues = [
      {},
      {condition: true},
      {condition: false},
    ]
    testValues.forEach(testValue => {
      snapshotTest(<BooleanType {...testValue} />)
    })
  })
})
