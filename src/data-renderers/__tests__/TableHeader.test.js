import React from 'react'
import { mount } from 'enzyme'
import { snapshotTest } from '../../../utils/tests'
import TableHeader from '../TableHeader'

// This stops the "is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements."
jest.mock('../HeaderField', () => () => 'HeaderField')

describe('Table Header', () => {
  const headerItem = {
    dataKey: 'header_sort_key',
    header: 'Header Text',
    item: jest.fn(),
    sortKey: '🍬',
    optional: false,
  }

  describe('Snapshots', () => {
    it('renders correctly', () => {
      const props = {
        headerItems: { ...headerItem },
        setSort: jest.fn(),
      }

      snapshotTest(<TableHeader {...props} />)
    })

    it('renders correctly with multiple header items', () => {
      const props = {
        headerItems: [
          { ...headerItem },
          {
            ...headerItem,
            header: 'Header Two Text',
            dataKey: 'header_two_key',
          },
        ],
        setSort: jest.fn(),
      }

      snapshotTest(<TableHeader {...props} />)
    })
  })

  describe('Functions', () => {
    it('will recieve props as array', () => {
      const props = {
        headerItems: headerItem,
      }
      const nextProps = {
        headerItems: [{...headerItem, dataKey: 'somethingelse'}],
      }

      const instance = mount(<TableHeader {...props} />).instance()

      instance.componentWillReceiveProps(nextProps)
      expect(instance.state.headerItems).toEqual([{...headerItem, dataKey: 'somethingelse'}])
    })

    it('will recieve props as non-array', () => {
      const props = {
        headerItems: headerItem,
      }
      const nextProps = {
        headerItems: {...headerItem, dataKey: 'somethingelse'},
      }

      const instance = mount(<TableHeader {...props} />).instance()

      instance.componentWillReceiveProps(nextProps)
      expect(instance.state.headerItems).toEqual([{...headerItem, dataKey: 'somethingelse'}])
    })

    it('will recieve same props', () => {
      const props = {
        headerItems: headerItem,
      }

      const nextProps = {
        headerItems: headerItem,
      }

      const instance = mount(<TableHeader {...props} />).instance()

      instance.componentWillReceiveProps(nextProps)
      expect(instance.state.headerItems).toEqual([headerItem])
    })

    it('saves width', () => {
      const props = {
        saveWidth: jest.fn(),
        label: 'something',
      }
      const instance = mount(<TableHeader {...props} />).instance()

      instance.setState({ width: 10 })

      instance.saveWidth()

      expect(props.saveWidth).toHaveBeenCalledTimes(1)

      expect(props.saveWidth).toHaveBeenCalledWith(props.label, 10)
    })
  })

  describe('sets width', () => {
    const instance = mount(<TableHeader />).instance()

    beforeEach(() => {
      instance.setState({ width: 50 })
    })

    it('width > 20', () => {
      instance.setWidth(50)

      expect(instance.state.width).toBe(100)
    })

    it('width < 20', () => {
      instance.setWidth('-40')

      expect(instance.state.width).toBe(50)
    })
  })
})
