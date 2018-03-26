import React from 'react'
import { snapshotTest } from 'utils/tests'

import { RelativeDate } from '../'

jest.mock('../DatePart', () => 'DatePart')
jest.mock('../Empty', () => 'Empty')

describe('RelativeDate type', () => {
  it('snapshot tests', () => {
    spyOn(console, 'warn')
    const testValues = [
      {},
      {value: '2018-02-07'},
      {value: '2018-02-07 14:00:11', showDate: false},
      {value: '2018-02-07 14:00:11', showDate: true},
      {value: 'abcdef'},
    ]
    testValues.forEach(testValue => {
      snapshotTest(<RelativeDate {...testValue} />)
    })
    expect(console.warn.calls.count()).toEqual(1)
  })
})
