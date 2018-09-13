import React from 'react'
import { shallow, mount } from 'enzyme'
import { snapshotTest } from 'utils/tests'
import HeaderField from '../HeaderField'

describe('HeaderField', () => {
  describe('Snapshots', () => {
    const props = {
      dataKey: 'header_sort_key',
      header: 'Header Text',
    }
    it('renders sortable', () => {
      snapshotTest(<HeaderField {...props} sortKey="🍰" />)
    })
    it('renders not sortable', () => {
      snapshotTest(<HeaderField {...props} />)
    })
    it('renders sorted asc', () => {
      snapshotTest(<HeaderField {...props} sortKey="🍰" activeSort />)
    })
    it('renders sorted desc', () => {
      snapshotTest(<HeaderField {...props} sortKey="🍰" activeSort={false} />)
    })
    it('renders with fa-sort icon', () => {
      snapshotTest(<HeaderField {...props} showSortIcon sortKey="🍰" activeSort={null} />)
    })
  })
  describe('Functions', () => {
    describe('handles click', () => {
      const baseProps = {
        dataKey: 'something',
        activeSort: true,
        updateSorting: jest.fn(),
        header: 'Thing',
        sortKey: '🎂',
      }
      beforeEach(() => {
        spyOn(baseProps, 'updateSorting')
      })
      it('has a full sort icon', () => {
        const props = {
          ...baseProps,
          activeSort: null,
          sortKey: '🍰',
          showSortIcon: true,
        }
        const wrapper = mount(<HeaderField {...props} />)
        expect(wrapper.html()).toContain('fa fa-sort')
      })
      it('has no sort key', () => {
        const props = {
          ...baseProps,
          sortKey: null,
        }
        const instance = shallow(<HeaderField {...props} />).instance()
        instance.handleClick()
        expect(baseProps.updateSorting).not.toHaveBeenCalled()
      })
      it('is not sorted', () => {
        const instance = shallow(<HeaderField {...baseProps} activeSort={false} />).instance()
        instance.handleClick()
        expect(baseProps.updateSorting).toHaveBeenCalledWith(baseProps.sortKey, true)
      })
      it('is sorted', () => {
        const instance = shallow(<HeaderField {...baseProps} activeSort />).instance()
        instance.handleClick()
        expect(baseProps.updateSorting).toHaveBeenCalledWith(baseProps.sortKey, false)
      })
    })
    describe('renders header', () => {
      const baseProps = {
        dataKey: 'something',
        activeSort: true,
        updateSorting: jest.fn(),
      }
      it('is a function', () => {
        const headerFn = (props) => <h5>Hello</h5>
        const instance = shallow(<HeaderField {...baseProps} header={headerFn} />).instance()
        const header = instance._renderHeader()
        expect(header).toEqual(jasmine.any(Object))
        snapshotTest(header)
      })
      it('is a string', () => {
        const headerText = 'Yellow Brick Road'
        const instance = shallow(<HeaderField {...baseProps} header={headerText} />).instance()
        expect(instance._renderHeader()).toBe(headerText)
      })
      it('is something else', () => {
        spyOn(console, 'error')
        const headerThing = 99
        const instance = shallow(<HeaderField {...baseProps} header={headerThing} />).instance()
        expect(instance._renderHeader()).toBe('')
        expect(console.error).toHaveBeenCalled()
        expect(console.error.calls.mostRecent().args[0]).toContain('Failed prop type: Invalid prop `header` supplied to `HeaderField`.')
      })
    })
  })
})
