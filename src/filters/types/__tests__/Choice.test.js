import React from 'react'
import { shallow } from 'enzyme'
import { snapshotTest } from 'utils/tests'
import Choice from '../Choice'

jest.useFakeTimers()

describe('Choice', () => {
  const baseProps = {
    onChange: jest.fn(),
    value: 44,
  }
  describe('Snapshots', () => {
    it('renders default', () => {
      snapshotTest(<Choice {...baseProps} />)
    })
    it('renders with options', () => {
      snapshotTest(<Choice {...baseProps} options={[{value: 1, label: 'One'}]} />)
    })
    it('renders with multiple choice', () => {
      snapshotTest(<Choice {...baseProps} multi />)
    })
    it('renders with remote options', () => {
      snapshotTest(<Choice {...baseProps} remote loadOptions={jest.fn()} />)
    })
    it('renders with custom value key', () => {
      snapshotTest(<Choice {...baseProps} valueKey="bob" />)
    })
    it('renders with custom label key', () => {
      snapshotTest(<Choice {...baseProps} labelKey="bob" />)
    })
    it('renders with custom option renderer', () => {
      const CustomRenderer = ({label, value}) => <h5>HI {label} {value}</h5>
      snapshotTest(<Choice {...baseProps} labelKey="bob" optionRenderer={CustomRenderer} />)
    })
    it('renders with placeholder', () => {
      snapshotTest(<Choice {...baseProps} placeholder="Testing testing" />)
    })
  })
  describe('Lifecycle', () => {
    it('componentWillReceiveProps', () => {
      const newProps = {
        value: [{value: 1, label: Promise.resolve('One')}, {value: 2, label: Promise.resolve('Two')}],
      }
      const expectedValue = [{value: 1, label: 'One'}, {value: 2, label: 'Two'}]
      const wrapper = shallow(<Choice {...baseProps} />)
      wrapper.instance().setState({value: null})
      const setState = wrapper.instance().setState.bind(wrapper.instance())
      wrapper.instance().updateValue = jest.fn((newValue) => { setState({value: expectedValue}) })
      wrapper.setProps(newProps)
      expect(wrapper.instance().updateValue).toHaveBeenCalledWith(newProps.value)
      expect(wrapper.instance().state.value).toEqual(expectedValue)
    })
  })
  describe('Functions', () => {
    describe('handles value changing', () => {
      beforeEach(() => {
        spyOn(baseProps, 'onChange')
      })
      describe('handles single choice', () => {
        it('receives single value', () => {
          const newValue = {value: 5}
          const instance = shallow(<Choice {...baseProps} />).instance()
          instance.handleChange(newValue)
          expect(baseProps.onChange).toHaveBeenCalledWith(newValue)
        })
        it('correctly resolves promised labels', async () => {
          const instance = shallow(<Choice {...baseProps} multi />).instance()
          await instance.updateValue([{value: 1, label: Promise.resolve('One')}, {value: 2, label: Promise.resolve('Two')}])
          expect(instance.state.value).toEqual([{value: 1, label: 'One'}, {value: 2, label: 'Two'}])
        })
        it('receives array value', () => {
          const newValue = [{value: 9}, {value: 5}]
          const instance = shallow(<Choice {...baseProps} />).instance()
          instance.handleChange(newValue)
          expect(baseProps.onChange).toHaveBeenCalledWith(newValue[0])
        })
        it('has custom value key', () => {
          const newValue = {bob: 67}
          const instance = shallow(<Choice {...baseProps} valueKey="bob" />).instance()
          instance.handleChange(newValue)
          expect(baseProps.onChange).toHaveBeenCalledWith(newValue)
        })
      })
      describe('handles multiple choice', () => {
        it('receives array value', () => {
          const newValue = [{value: 9}, {value: 5}]
          const instance = shallow(<Choice {...baseProps} multi />).instance()
          instance.handleChange(newValue)
          expect(baseProps.onChange).toHaveBeenCalledWith(newValue)
        })
        it('receives single value', () => {
          const newValue = {value: 5}
          const instance = shallow(<Choice {...baseProps} multi />).instance()
          instance.handleChange(newValue)
          expect(baseProps.onChange).toHaveBeenCalledWith([newValue])
        })
        it('has custom value key', () => {
          const newValue = [{bob: 67}]
          const instance = shallow(<Choice {...baseProps} multi valueKey="bob" />).instance()
          instance.handleChange(newValue)
          expect(baseProps.onChange).toHaveBeenCalledWith(newValue)
        })
      })
      describe('debounces loading options', () => {
        it('replaces existing fetchScheduled', () => {
          const loadSpy = jasmine.createSpy()
          const instance = shallow(<Choice {...baseProps} remote loadOptions={loadSpy} />).instance()
          instance.scheduleLoadOptions(1, 2)
          expect(setTimeout).toHaveBeenCalledTimes(2)
          expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 450)
          expect(typeof instance.state.fetchScheduled).toBe('number')
          expect(instance.state.fetchScheduled % 1).toBe(0)
          instance.scheduleLoadOptions(3, 4)
          expect(clearTimeout).toHaveBeenCalledTimes(1)
          jest.runOnlyPendingTimers()
          expect(loadSpy).toHaveBeenCalledWith(3, 4)
        })
      })
    })
  })
})
