import React from 'react'
import { shallow } from 'enzyme'
import { snapshotTest } from 'utils/tests'
import Search from '../Search'

jest.useFakeTimers()

describe('Search', () => {
  const baseProps = {
    onChange: jest.fn(),
    value: 'Kittens',
    updateDelay: 1234,
  }
  describe('Snapshots', () => {
    it('renders default', () => {
      snapshotTest(<Search {...baseProps} />)
    })
    it('has new value', () => {
      snapshotTest(<Search {...baseProps} />, {currentValue: 21})
    })
  })
  describe('Lifecycle', () => {
    it('componentWillReceiveProps', () => {
      const newProps = {
        value: 'Hello my fluffies 🐈🐈',
      }
      const wrapper = shallow(<Search {...baseProps} />)
      wrapper.setProps(newProps)
      expect(wrapper.instance().state.currentValue).toEqual(newProps.value)
    })
  })
  describe('Functions', () => {
    let instance
    beforeEach(() => {
      spyOn(baseProps, 'onChange')
      instance = shallow(<Search {...baseProps} />).instance()
    })
    it('handles value change', () => {
      const mockValue = 'Some search term'
      const mockEvent = {
        target: {
          value: mockValue,
        },
      }
      spyOn(instance, 'scheduleUpdate')
      instance.handleValueChange(mockEvent)
      expect(instance.state.currentValue).toBe(mockValue)
      expect(instance.scheduleUpdate).toHaveBeenCalled()
      expect(baseProps.onChange).not.toHaveBeenCalled()
    })
    it('schedules update', () => {
      instance.setState({currentValue: 'Bob', updateScheduled: null})
      instance.scheduleUpdate()
      expect(setTimeout).toHaveBeenCalledTimes(2)
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), baseProps.updateDelay)
      expect(typeof instance.state.updateScheduled).toBe('number')
      expect(instance.state.updateScheduled % 1).toBe(0)
      instance.scheduleUpdate()
      expect(clearTimeout).toHaveBeenCalledTimes(1)
      instance.setState({currentValue: 'Not Bob'})
      jest.runOnlyPendingTimers()
      expect(baseProps.onChange).toHaveBeenCalledWith('Not Bob')
    })
  })
})
