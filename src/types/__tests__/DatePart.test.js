import React from 'react'
import { shallow } from 'enzyme'
import { DATE_FORMAT } from '../../utils'
import DatePart from '../DatePart'
import DateTime from '../DateTime'

describe('DatePart type', () => {
  test('contained check', () => {
    const wrapper = shallow(<DatePart />)

    expect(wrapper.equals(<DateTime outputFormat={DATE_FORMAT} />)).toBe(true)
  })
})
