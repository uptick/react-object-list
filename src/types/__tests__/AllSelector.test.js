import React from 'react'
import { shallow } from 'enzyme'
import {
  snapshotTest,
} from 'utils/tests'
import { AllSelector } from '../'

describe('Selector type', () => {
  it('snapshot test', () => {
    snapshotTest(<AllSelector />)
    snapshotTest(<AllSelector allSelected />)
  })
  it('makes a call to the callback function when changed', () => {
    const callback = jest.fn()
    const wrapper = shallow(<AllSelector toggleSelectAll={callback} />)
    expect(callback).not.toBeCalled()
    wrapper.find('input').simulate('change')
    expect(callback).toBeCalled()
  })
})
