import React from 'react'
import { snapshotTest } from 'utils/tests'
import { TextAttr } from '../'

describe('TextAttr type', () => {
  it('snapshot tests', () => {
    const input = {data: null}
    const noAttrs = {data: {id: 1, type: 'TestModel'}}
    const allAttrs = {data: {
      id: 1,
      type: 'TestModel',
      attributes: {
        __str__: 'default',
        name: 'abc',
        ref: '123',
        detail: 'some important detail',
        empty: '',
      },
    }}
    const testValues = [
      {},
      {value: input},
      {value: noAttrs},
      {value: allAttrs},
      {value: allAttrs, display: null},
      {value: allAttrs, display: 'name'},
      {value: allAttrs, display: 'name', identifier: 'ref'},
      {value: allAttrs, display: 'name', identifier: 'ref', subtext: 'detail'},
      {value: allAttrs, display: 'name', identifier: 'wrongref', subtext: 'wrongdetail'},
      {value: allAttrs, display: 'type', identifier: 'type', subtext: 'type'},
      {value: allAttrs, display: 'empty'},
    ]
    testValues.forEach(testValue => {
      snapshotTest(<TextAttr {...testValue} />)
    })
  })
})
