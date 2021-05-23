import React from 'react'
import { snapshotTest } from '../../../utils/tests'
import FiltersContainer from '../FiltersContainer'

describe('<FiltersContainer />', () => {
  describe('Snapshot', () => {
    const Renderer = (props) => <span>{props.filterKey}</span>
    const defaultProps = {
      filters: [
        {filterKey: 'a', value: 'some value', active: true, Renderer},
        {filterKey: 'b', active: false, Renderer},
        {filterKey: 'c', value: 'some other value', active: false, Renderer},
      ],
      updateFilter: jest.fn(),
    }
    afterEach(() => {
      defaultProps.updateFilter.mockClear()
    })

    it('renders correctly', () => {
      snapshotTest(<FiltersContainer {...defaultProps} />)
    })
  })
})
