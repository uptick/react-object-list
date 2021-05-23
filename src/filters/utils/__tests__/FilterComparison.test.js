import React from 'react'
import { shallow } from 'enzyme'
import { snapshotTest } from 'utils/tests'
import FilterComparison from '../FilterComparison'

describe('FilterComparison', () => {
  const baseProps = {
    onChange: jest.fn(),
    value: 'test',
    options: [{value: 'test', label: 'Test This'}],
  }
  describe('Snapshots', () => {
    it('renders default', () => {
      snapshotTest(<FilterComparison {...baseProps} />)
    })
  })
  describe('Functions', () => {
    it('handles change', () => {
      spyOn(baseProps, 'onChange')
      const instance = shallow(<FilterComparison {...baseProps} />).instance()
      instance.handleChange({value: 42})
      expect(baseProps.onChange).toHaveBeenCalledWith(42)
    })
  })
})
