import React from 'react'
import { shallow } from 'enzyme'
import { snapshotTest } from 'utils/tests'
import NumberSlider from '../NumberSlider'

describe('NumberSlider', () => {
  const baseProps = {
    onChange: jest.fn(),
    value: 50,
  }
  describe('Snapshots', () => {
    it('renders default', () => {
      snapshotTest(<NumberSlider {...baseProps} />)
    })
    it('custom min', () => {
      snapshotTest(<NumberSlider {...baseProps} min={30} />)
    })
    it('custom max', () => {
      snapshotTest(<NumberSlider {...baseProps} max={2000} />)
    })
  })
  describe('Lifecycle', () => {
    it('componentWillReceiveProps', () => {
      const newProps = {
        value: 3128907234589789,
      }
      const wrapper = shallow(<NumberSlider {...baseProps} />)
      wrapper.setProps(newProps)
      expect(wrapper.instance().state.currentValue).toEqual(newProps.value)
    })
  })
  describe('Functions', () => {
    let instance
    beforeEach(() => {
      spyOn(baseProps, 'onChange')
      instance = shallow(<NumberSlider {...baseProps} />).instance()
    })
    it('handles slider value change', () => {
      const mockValue = Math.floor(Math.random() * 100) + 1
      const mockEvent = {
        target: {
          value: mockValue,
        },
      }
      instance.handleSliderValueChange(mockEvent)
      expect(instance.state.currentValue).toBe(mockValue)
      expect(baseProps.onChange).not.toHaveBeenCalled()
    })
    it('handles value change', () => {
      const mockValue = Math.floor(Math.random() * 100) + 1
      const mockEvent = {
        target: {
          value: mockValue,
        },
      }
      instance.handleValueChange(mockEvent)
      expect(instance.state.currentValue).toBe(mockValue)
      expect(baseProps.onChange).toHaveBeenCalledWith(mockValue)
    })
  })
})
