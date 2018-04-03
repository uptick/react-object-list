import React from 'react'
import { shallow } from 'enzyme'
import { snapshotTest } from 'utils/tests'
import Choice from '../Choice'

jest.mock('react-select')

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
    })
  })
})
