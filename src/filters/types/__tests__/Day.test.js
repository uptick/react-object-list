import React from 'react'
import Moment from 'moment'
import { shallow } from 'enzyme'
import { snapshotTest } from '../../../../utils/tests'
import Day from '../Day'

describe('Day', () => {
  const baseProps = {
    onChange: jest.fn(),
    value: Moment(),
  }
  describe('Snapshots', () => {
    it('renders default', () => {
      snapshotTest(<Day {...baseProps} />)
    })
  })
  describe('Functions', () => {
    let instance
    let mockEvent
    beforeEach(() => {
      spyOn(baseProps, 'onChange')
      instance = shallow(<Day {...baseProps} />).instance()
      mockEvent = {
        preventDefault: jasmine.createSpy(),
      }
    })
    it('handles previous click', () => {
      instance.handlePreviousClick(mockEvent)
      expect(mockEvent.preventDefault).toHaveBeenCalled()
      const expectedValue = instance.props.value.clone().subtract(1, 'days')
      expect(baseProps.onChange).toHaveBeenCalledWith(expectedValue)
    })
    it('handles next click', () => {
      instance.handleNextClick(mockEvent)
      expect(mockEvent.preventDefault).toHaveBeenCalled()
      const expectedValue = instance.props.value.clone().add(1, 'days')
      expect(baseProps.onChange).toHaveBeenCalledWith(expectedValue)
    })
  })
})
