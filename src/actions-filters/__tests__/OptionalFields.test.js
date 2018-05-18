import React from 'react'
import { shallow } from 'enzyme'
import { snapshotTest } from 'utils/tests'
import OptionalFields from '../OptionalFields'

jest.mock('../OptionalField', () => 'OptionalField')

describe('<OptionalFields />', () => {
  const defaultProps = {
    extraColumns: ['a', 'b'],
    optionalFields: [
      {dataKey: 'a', header: 'Apple'},
      {dataKey: 'c', header: 'Cat'},
    ],
    updateColumns: jest.fn(),
  }
  describe('Snapshot', () => {
    afterEach(() => {
      defaultProps.updateColumns.mockClear()
    })

    it('renders correctly', () => {
      snapshotTest(<OptionalFields {...defaultProps} />)
      snapshotTest(<OptionalFields {...defaultProps} />, {optionalFieldsOpen: true})
    })
  })
  describe('Functions', () => {
    describe('handles dropdown', () => {
      let instance
      const mockEvent = {
        target: null,
      }
      beforeEach(() => {
        instance = shallow(<OptionalFields {...defaultProps} />).instance()
        instance.setState({optionalFieldsOpen: true})
        instance.optionalFieldsDropdown = 'optionalFieldsDropdown'
        instance.optionalFieldsButton = 'buttonOF'
      })
      it('target is elsewhere', () => {
        instance.handleDropdown(mockEvent)
        expect(instance.state.optionalFieldsOpen).toBeFalsy()
      })
      it('target contains element', () => {
        instance.handleDropdown({target: {parentElement: {parentElement: instance.optionalFieldsDropdown}}})
        expect(instance.state.optionalFieldsOpen).toBeTruthy()
      })
      it('target is element', () => {
        mockEvent.target = instance.optionalFieldsButton
        instance.handleDropdown(mockEvent)
        expect(instance.state.optionalFieldsOpen).toBe(false)
        instance.handleDropdown(mockEvent)
        expect(instance.state.optionalFieldsOpen).toBe(true)
      })
    })
  })
})
