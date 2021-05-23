import React from 'react'
import { snapshotTest } from 'utils/tests'

import { RelativeDate } from '../'

jest.mock('../DatePart', () => 'DatePart')
jest.mock('../Empty', () => 'Empty')

describe('RelativeDate type', () => {
  it('snapshot tests', () => {
    // Expecting a warning since one of our test values is not a valid date
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
    expect(console.warn.calls.mostRecent().args[0]).toContain('value provided is not in a recognized RFC2822 or ISO format')
  })
})
