import React from 'react'
import { shallow } from 'enzyme'
import {
  snapshotTest,
} from 'utils/tests'
import { Selector } from '../'

describe('Selector type', () => {
  it('snapshot test', () => {
    snapshotTest(<Selector />)
    snapshotTest(<Selector selected />)
  })
  it('makes a call to the callback function when changed', () => {
    const callback = jest.fn()
    const id = 534
    const wrapper = shallow(<Selector toggleSelect={callback} id={id} />)
    expect(callback).not.toBeCalled()
    wrapper.find('input').simulate('change')
    expect(callback).lastCalledWith(id)
  })
})
