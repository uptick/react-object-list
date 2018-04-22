import React from 'react'
import Moment from 'moment'
import { shallow } from 'enzyme'
import { snapshotTest } from 'utils/tests'
import DateComponent from '../Date'

jest.mock('react-day-picker/DayPickerInput', () => 'DayPickerInput')
jest.mock('react-select')

describe('DateComponent', () => {
  const baseProps = {
    onChange: jest.fn(),
    value: Date(),
    fixedComparison: {value: 'fixed', label: 'Exact'},
    comparison: 'fixed',
  }
  describe('Snapshots', () => {
    it('renders default', () => {
      snapshotTest(<DateComponent {...baseProps} />)
    })
    it('renders with relative comparison', () => {
      snapshotTest(<DateComponent {...baseProps} comparison="relative" />)
    })
    it('has custom input format', () => {
      snapshotTest(<DateComponent {...baseProps} inputFormat="Do MMM YY" />)
    })
    it('has custom relative date options', () => {
      snapshotTest(<DateComponent {...baseProps} comparison="relative" relativeDateOptions={[
        {value: 'now', label: 'Right now'},
        {value: 'later', label: 'A bit later'},
        {value: 'never', label: 'Never ever'},
      ]} />)
    })
    it('has null value', () => {
      snapshotTest(<DateComponent {...baseProps} value={null} />)
    })
  })
  describe('Functions', () => {
    describe('handles fixed date changing', () => {
      let instance
      beforeEach(() => {
        spyOn(baseProps, 'onChange')
        instance = shallow(<DateComponent {...baseProps} />).instance()
      })
      it('handles valid date', () => {
        const newValue = Moment()
        instance.handleDateValueChange(newValue)
        expect(baseProps.onChange).toHaveBeenCalledWith(newValue)
      })
      it('handles invalid date', () => {
        const newValue = 'Invalid date'
        instance.handleDateValueChange(newValue)
        expect(baseProps.onChange).toHaveBeenCalledWith(null)
      })
    })
    describe('handles relative date changing', () => {
      let instance
      beforeEach(() => {
        spyOn(baseProps, 'onChange')
        instance = shallow(<DateComponent {...baseProps} />).instance()
      })
      it('handles array passed', () => {
        const newValue = ['now']
        instance.handleDateRelativeChange(newValue)
        expect(baseProps.onChange).not.toHaveBeenCalled()
      })
      it('handles single value', () => {
        const newValue = 'now'
        instance.handleDateRelativeChange(newValue)
        expect(baseProps.onChange).toHaveBeenCalledWith(newValue)
      })
    })
  })
})
