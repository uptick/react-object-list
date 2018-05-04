import React from 'react'
import { mount } from 'enzyme'
import {
  snapshotTest,
} from 'utils/tests'
import { AllSelector } from '../'

describe('Selector type', () => {
  it('snapshot test', () => {
    snapshotTest(<AllSelector />)
    snapshotTest(<AllSelector numSelected={4} total={4} />)
  })
  it('calls select when none selected', () => {
    const callback = jest.fn()
    const wrapper = mount(<AllSelector selectAll={callback} />)
    expect(callback).not.toBeCalled()
    wrapper.find('input').simulate('change')
    expect(callback).toBeCalled()
  })
  it('calls deselect when some selected', () => {
    const callback = jest.fn()
    const wrapper = mount(<AllSelector numSelected={5} total={10} deselectAll={callback} />)
    expect(callback).not.toBeCalled()
    wrapper.find('input').simulate('change')
    expect(callback).toBeCalled()
  })
})
