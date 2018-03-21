import React from 'react'
import { shallow } from 'enzyme'
import { snapshotTest } from 'utils/tests'
import WidthHandle from '../WidthHandle'

describe('WidthHandle', () => {
  const defaultProps = {
    onChange: jest.fn(),
    onSave: jest.fn(),
  }
  describe('Snapshots', () => {
    it('default', () => {
      snapshotTest(<WidthHandle />)
    })
  })
  describe('Functions', () => {
    const dummyEvent = {
      clientX: 42,
    }
    describe('handles global mouse move event', () => {
      let spyOnChange
      beforeEach(() => {
        spyOnChange = spyOn(defaultProps, 'onChange')
      })
      it('is not enabled', () => {
        const wrapper = shallow(<WidthHandle {...defaultProps} />).instance()
        wrapper.setState({enabled: false, x: 99})
        wrapper.handleGlobalMouseMove(dummyEvent)
        expect(spyOnChange).not.toHaveBeenCalled()
        expect(wrapper.state.x).toBe(99)
      })
      it('is enabled but has no x', () => {
        const wrapper = shallow(<WidthHandle {...defaultProps} />).instance()
        wrapper.setState({enabled: true, x: null})
        wrapper.handleGlobalMouseMove(dummyEvent)
        expect(spyOnChange).not.toHaveBeenCalled()
        expect(wrapper.state.x).toBe(42)
      })
      it('is enabled and has existing x', () => {
        const wrapper = shallow(<WidthHandle {...defaultProps} />).instance()
        wrapper.setState({enabled: true, x: 12})
        wrapper.handleGlobalMouseMove(dummyEvent)
        expect(spyOnChange).toHaveBeenCalledWith(30)
        expect(wrapper.state.x).toBe(42)
      })
    })
    describe('handles global mouse up event', () => {
      let spyOnDisabled
      let spyOnSave
      let wrapper
      beforeEach(() => {
        spyOnSave = spyOn(defaultProps, 'onSave')
        wrapper = shallow(<WidthHandle {...defaultProps} />).instance()
        spyOnDisabled = spyOn(wrapper, 'setDisabled')
      })
      it('is not enabled', () => {
        wrapper.setState({enabled: false})
        wrapper.handleGlobalMouseUp(dummyEvent)
        expect(spyOnDisabled).not.toHaveBeenCalled()
        expect(spyOnSave).not.toHaveBeenCalled()
      })
      it('is enabled', () => {
        wrapper.setState({enabled: true})
        wrapper.handleGlobalMouseUp(dummyEvent)
        expect(spyOnDisabled).toHaveBeenCalled()
        expect(spyOnSave).toHaveBeenCalled()
      })
    })
    it('sets enabled', () => {
      const wrapper = shallow(<WidthHandle {...defaultProps} />).instance()
      wrapper.setState({enabled: false})
      expect(wrapper.state.enabled).toBe(false)
      wrapper.setEnabled()
      expect(wrapper.state.enabled).toBe(true)
    })
    it('sets enabled', () => {
      const wrapper = shallow(<WidthHandle {...defaultProps} />).instance()
      wrapper.setState({enabled: true, x: 762})
      expect(wrapper.state.enabled).toBe(true)
      expect(wrapper.state.x).toBe(762)
      wrapper.setDisabled()
      expect(wrapper.state.enabled).toBe(false)
      expect(wrapper.state.x).toBe(null)
    })
    it('handles mouse over', () => {
      const wrapper = shallow(<WidthHandle {...defaultProps} />).instance()
      wrapper.setState({hover: false})
      expect(wrapper.state.hover).toBe(false)
      wrapper.handleMouseOver()
      expect(wrapper.state.hover).toBe(true)
    })
    it('handles mouse out', () => {
      const wrapper = shallow(<WidthHandle {...defaultProps} />).instance()
      wrapper.setState({hover: true})
      expect(wrapper.state.hover).toBe(true)
      wrapper.handleMouseOut()
      expect(wrapper.state.hover).toBe(false)
    })
    it('sets width', () => {
      const spy = spyOn(defaultProps, 'onChange')
      const wrapper = shallow(<WidthHandle {...defaultProps} />).instance()
      wrapper.setWidth(912)
      expect(spy).toHaveBeenCalledWith(912)
    })
  })
})
