import React from 'react'
import Moment from 'moment'
import { shallow } from 'enzyme'
import { snapshotTest } from 'utils/tests'
import Month from '../Month'

jest.mock('react-month-picker', () => 'MonthPicker')

describe('Month', () => {
  const baseProps = {
    onChange: jest.fn(),
    value: Moment(),
    minYear: 2000,
    maxYear: 2050,
  }
  describe('Snapshots', () => {
    it('renders default', () => {
      snapshotTest(<Month {...baseProps} />)
    })
    it('has format', () => {
      snapshotTest(<Month {...baseProps} format="MM/YY" />)
    })
    it('has minYear', () => {
      snapshotTest(<Month {...baseProps} minYear={2010} />)
    })
    it('has maxYear', () => {
      snapshotTest(<Month {...baseProps} maxYear={2020} />)
    })
    it('has null value', () => {
      snapshotTest(<Month {...baseProps} value={null} />)
    })
    it('has undefined value', () => {
      snapshotTest(<Month {...baseProps} value={undefined} />)
    })
  })
  describe('Functions', () => {
    let instance
    beforeEach(() => {
      spyOn(baseProps, 'onChange')
      instance = shallow(<Month {...baseProps} />).instance()
    })
    describe('handleTextChange', () => {
      it('handles valid month', () => {
        instance.refs = {
          textInput: {
            value: 'Jan 2016',
          },
        }
        const monthValue = Moment(instance.refs.textInput.value, instance.props.format).format('x')
        instance.handleTextChange()
        expect(instance.state.textValue).toBe(instance.refs.textInput.value)
        expect(baseProps.onChange).toHaveBeenCalledWith(monthValue)
      })
      it('handles invalid month', () => {
        instance.refs = {
          textInput: {
            value: 'Jemima puddle duck',
          },
        }
        instance.handleTextChange()
        expect(instance.state.textValue).toBe(instance.refs.textInput.value)
        expect(baseProps.onChange).toHaveBeenCalledWith(null)
      })
    })
    it('handles click', () => {
      instance = shallow(<Month {...baseProps} />).instance()
      instance.refs = {
        monthPicker: {
          show: jest.fn(),
        },
      }
      spyOn(instance.refs.monthPicker, 'show')
      instance.handleClick()
      expect(instance.refs.monthPicker.show).toHaveBeenCalled()
    })
    it('handles value change', () => {
      const mockYear = Math.floor(Math.random() * 50) + 2000
      const mockMonth = Math.floor(Math.random() * 12)
      const date = Moment({year: mockYear, month: mockMonth})
      instance.handleValueChange(mockYear, mockMonth + 1)
      expect(instance.state.textValue).toBe(date.format(instance.props.format))
      const arg = baseProps.onChange.calls.mostRecent().args
      expect(arg.toString()).toEqual(date.toString())
    })
  })
})
