import React from 'react'
import { shallow } from 'enzyme'
import { DATE_FORMAT } from '../../utils'
import DatePart from '../DatePart'
import DateTime from '../DateTime'

describe('DatePart type', () => {
  test('contained check', () => {
    const datepart = shallow(<DatePart />)
    expect(datepart.equals(<DateTime outputFormat={DATE_FORMAT} dateOnly />)).toBe(true)
  })
})
