import React from 'react'
import { shallow } from 'enzyme'
import {
  snapshotTest,
} from 'utils/tests'
import {
  ObjectLink,
  Relation,
} from '../'

describe('Relation type', () => {
  it('snapshot tests', () => {
    const input = {data: null}
    const noAttrs = {data: {id: 1, type: 'TestModel'}}
    const strAttr = {...noAttrs,
      attributes: {
        __str__: 'default',
      },
    }
    const testValues = [
      {},
      {value: input},
      {value: noAttrs},
      {value: strAttr},
      {value: strAttr, tag: 'ref'},
      {value: strAttr, tag: '__str__'},
      {value: strAttr, detail: 'ref'},
      {value: strAttr, detail: '__str__'},
    ]
    testValues.forEach(testValue => {
      snapshotTest(<Relation {...testValue} />)
    })
    const relation = shallow(<Relation value={strAttr} showLink={false} />)
    expect(relation.containsMatchingElement(<ObjectLink value={strAttr} linked={false} />)).toBe(true)
  })
})
