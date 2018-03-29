import React from 'react'
import { shallow } from 'enzyme'
import { snapshotTest } from 'utils/tests'
import OptionalField from '../OptionalField'

describe('OptionalField', () => {
  const defaultProps = {
    onChange: jest.fn(),
    fieldKey: 'a',
    name: 'Apple',
  }
  describe('Snapshot', () => {
    it('renders default', () => {
      snapshotTest(<OptionalField {...defaultProps} />)
    })
    it('renders enabled', () => {
      snapshotTest(<div><OptionalField {...defaultProps} enabled /></div>)
    })
  })
  describe('Functions', () => {
    it('toggles', () => {
      const mockEvent = {
        preventDefault: jasmine.createSpy(),
      }
      spyOn(defaultProps, 'onChange')
      const instance = shallow(<OptionalField {...defaultProps} enabled />).instance()
      instance.toggle(mockEvent)
      expect(mockEvent.preventDefault).toHaveBeenCalled()
      expect(defaultProps.onChange).toHaveBeenCalledWith(defaultProps.fieldKey)
    })
  })
})
