import React from 'react'
import { shallow } from 'enzyme'
import {
  snapshotTest,
} from 'utils/tests'
import { ObjectLink, Links } from '../'

describe('ObjectLink type', () => {
  it('snapshot tests', () => {
    const input = {data: null}
    const noAttrs = {data: {id: 1, type: 'TestModel'}}
    const noLink = {...noAttrs,
      attributes: {
        __str__: 'default',
      },
    }
    const methodLink = {...noLink,
      attributes: {
        ...noLink.attributes,
        get_absolute_url: '/absolute/',
      },
    }
    const propertyLink = {...noLink,
      attributes: {
        ...methodLink.attributes,
        __web_url__: '/web/',
      },
    }
    const testValues = [
      {},
      {value: input},
      {value: noAttrs},
      {value: noLink},
      {value: noLink, url: 'http://uptickhq.com'},
      {value: methodLink},
      {value: propertyLink},
    ]
    testValues.forEach(testValue => {
      snapshotTest(<ObjectLink {...testValue} />)
    })
    const objectLink = shallow(<ObjectLink value={noLink} a="b" renderer={Links} renderProps={{b: 'c'}} />)
    expect(objectLink.containsMatchingElement(<Links value={noLink} a="b" b="c" />)).toBe(true)
  })
})
