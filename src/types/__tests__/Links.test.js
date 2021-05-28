import React from 'react'
import { snapshotTest } from '../../../utils/tests'
import { Links } from '../'

describe('Links type', () => {
  it('snapshot test', () => {
    const testValues = [
      {},
      {viewUrl: '/view/'},
      {editUrl: '/edit/'},
      {viewUrl: '/view/', editUrl: '/edit/'},
    ]
    testValues.forEach(testValue => {
      snapshotTest(<Links {...testValue} />)
    })
  })
})
