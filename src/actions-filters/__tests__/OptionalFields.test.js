import React from 'react'
import { snapshotTest } from 'utils/tests'
import OptionalFields from '../OptionalFields'

jest.mock('../OptionalField', () => 'OptionalField')

describe('<OptionalFields />', () => {
  describe('Snapshot', () => {
    const defaultProps = {
      extraColumns: ['a', 'b'],
      optionalFields: [
        {dataKey: 'a', header: 'Apple'},
        {dataKey: 'c', header: 'Cat'},
      ],
      updateColumns: jest.fn(),
    }
    afterEach(() => {
      defaultProps.updateColumns.mockClear()
    })

    it('renders correctly', () => {
      snapshotTest(<OptionalFields {...defaultProps} />)
      snapshotTest(<OptionalFields {...defaultProps} />, {optionalFieldsOpen: true})
    })
  })
})
