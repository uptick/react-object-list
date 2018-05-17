import React from 'react'
import { snapshotTest } from 'utils/tests'
import { shallow } from 'enzyme'
import Boolean from '../Boolean'

jest.mock('../Choice', () => 'Choice')

describe('Boolean', () => {
  const baseProps = {
    onChange: jest.fn(),
    value: 'True',
  }
  describe('Snapshots', () => {
    it('renders true', () => {
      snapshotTest(<Boolean {...baseProps} />)
    })
    it('renders false', () => {
      snapshotTest(<Boolean {...baseProps} value="False" />)
    })
    it('has custom labels', () => {
      snapshotTest(<Boolean {...baseProps} trueLabel="Very True" falseLabel="Super False" />)
    })
  })
  describe('Functions', () => {
    let instance
    beforeEach(() => {
      spyOn(baseProps, 'onChange')
      instance = shallow(<Boolean {...baseProps} />).instance()
    })
    it('handles value change', () => {
      const mockValue = {value: 'False', key: '1'}
      instance.onValueChange(mockValue)
      expect(baseProps.onChange).lastCalledWith('False')
    })
  })
})
