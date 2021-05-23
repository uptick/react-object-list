import React from 'react'
import { shallow, mount } from 'enzyme'
import { snapshotTest } from '../../../utils/tests'
import { AllSelector } from '../'

describe('Selector type', () => {
  beforeAll(() => {
    spyOn(AllSelector.prototype, 'componentDidMount')
  })
  describe('Snapshots', () => {
    it('renders default', () => {
      snapshotTest(<AllSelector />)
    })
    it('renders all selected', () => {
      snapshotTest(<AllSelector numSelected={4} total={4} />)
    })
  })
  describe('Lifecycle', () => {
    it('updates interdeterminateness when props changed', () => {
      const wrapper = shallow(<AllSelector />)
      const instance = wrapper.instance()
      spyOn(instance, '__setIndeterminate')
      wrapper.setProps({numSelected: 4, total: 10})
      expect(instance.__setIndeterminate).toHaveBeenCalledWith(4, 10)
    })
  })
  describe('Events', () => {
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
})
