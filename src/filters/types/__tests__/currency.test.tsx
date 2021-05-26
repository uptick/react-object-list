import React from 'react'
import { shallow } from 'enzyme'
import { snapshotTest } from '../../../../utils/tests'
import Currency from '../currency'

describe('Currency', () => {
  const baseProps = {
    onChange: jest.fn(),
    value: '25.08',
  }

  describe('Snapshots', () => {
    it('enders default', () => {
      snapshotTest(<Currency {...baseProps} />)
    })

    it('renders with currency symbol', () => {
      const instance = shallow(<Currency {...baseProps} currencySymbol="AUD" />)

      const element = instance.find('input').props().value

      expect(element).toBe('A$25.08')
    })

    it('renders with custom currency symbol', () => {
      const instance = shallow(<Currency {...baseProps} currencySymbol="CNY" />)

      const element = instance.find('input').props().value

      expect(element).toBe('CN¥25.08')
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
