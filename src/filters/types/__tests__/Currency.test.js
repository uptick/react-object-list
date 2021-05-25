import React from 'react'
import { shallow } from 'enzyme'
import { snapshotTest } from '../../../../utils/tests'
import Currency from '../Currency'

describe('Currency', () => {
  const baseProps = {
    onChange: jest.fn(),
    value: '25.08',
  }

  describe('Snapshots', () => {
    it('renders default', () => {
      snapshotTest(<Currency {...baseProps} />)
    })

    it('renders with custom currency symbol', () => {
      snapshotTest(<Currency {...baseProps} currencySymbol="%" />)
    })
  })

  describe('Functions', () => {
    it('handles value changing', () => {
      spyOn(baseProps, 'onChange')

      const instance = shallow(<Currency {...baseProps} />)

      instance.find('input').simulate('change', { currentTarget: { value: '1234567890' } })

      expect(baseProps.onChange).toHaveBeenCalledWith('1234567890')
    })
  })
})
