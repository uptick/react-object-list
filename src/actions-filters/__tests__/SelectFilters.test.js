import React from 'react'
import { snapshotTest } from '../../../utils/tests'
import SelectFilters from '../SelectFilters'

describe('<SelectFilters />', () => {
  describe('Snapshot', () => {
    const defaultProps = {
      filters: [
        {key: 'a', Renderer: () => 'Apple', props: {}, active: true, value: 'green'},
        {key: 'c', Renderer: () => 'Cat', props: {}},
      ],
      addFilter: jest.fn(),
    }
    afterEach(() => {
      defaultProps.addFilter.mockClear()
    })

    it('renders correctly', () => {
      snapshotTest(<SelectFilters {...defaultProps} />)
    })
  })
})
