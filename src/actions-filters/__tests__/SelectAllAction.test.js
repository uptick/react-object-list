import React from 'react'
import { shallow } from 'enzyme'
import { snapshotTest } from 'utils/tests'
import SelectAllAction from '../SelectAllAction'

describe('<SelectAllAction />', () => {
  describe('Snapshot', () => {
    it('does not render with no props', () => {
      snapshotTest(<SelectAllAction />)
    })
    it('shows both select all and deselect', () => {
      const props = {
        selectAll: jest.fn(),
        count: 5,
        numSelected: 3,
        itemCount: 3,
      }
      snapshotTest(<SelectAllAction {...props} />)
    })
    it('shows deselect all when some of the items are selected', () => {
      const props = {
        count: 5,
        numSelected: 2,
        itemCount: 3,
      }
      snapshotTest(<SelectAllAction {...props} />)
    })
    it('shows deselect all when all the items are selected', () => {
      const props = {
        count: 5,
        numSelected: 5,
        itemCount: 3,
      }
      snapshotTest(<SelectAllAction {...props} />)
    })
    it('shows global select all when selected all on page', () => {
      const props = {
        selectAll: jest.fn(),
        count: 5,
        numSelected: 3,
        itemCount: 3,
      }
      snapshotTest(<SelectAllAction {...props} />)
    })
  })
  describe('Functions', () => {
    let instance
    const baseProps = {}
    const mockEvent = {}
    beforeEach(() => {
      mockEvent['preventDefault'] = jasmine.createSpy()
      baseProps['selectAll'] = jasmine.createSpy()
      baseProps['deselectAll'] = jasmine.createSpy()
      instance = shallow(<SelectAllAction {...baseProps} />).instance()
    })
    it('selects all', () => {
      instance.handleSelectAllClick(mockEvent)
      expect(mockEvent.preventDefault).toHaveBeenCalled()
      expect(baseProps.selectAll).toHaveBeenCalled()
    })
    it('deselects all', () => {
      instance.handleDeselectAllClick(mockEvent)
      expect(mockEvent.preventDefault).toHaveBeenCalled()
      expect(baseProps.deselectAll).toHaveBeenCalled()
    })
  })
})
