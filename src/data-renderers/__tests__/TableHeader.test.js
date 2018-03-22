import React from 'react'
import { shallow } from 'enzyme'
import { snapshotTest } from 'utils/tests'
import TableHeader from '../TableHeader'

jest.mock('../HeaderField', () => 'HeaderField')

describe('Table Header', () => {
  describe('Snapshots', () => {
    const headerItem = {
      dataKey: 'header_sort_key',
      header: 'Header Text',
      item: jest.fn(),
      sortable: true,
      optional: false,
    }

    it('renders correctly', () => {
      const props = {
        headerItems: {...headerItem},
        setSort: jest.fn(),
      }
      snapshotTest(<TableHeader {...props} />)
    })
    it('renders correctly with multiple header items', () => {
      const props = {
        headerItems: [{...headerItem}, {...headerItem, header: 'Header Two Text', key: 'header_two_key'}],
        setSort: jest.fn(),
      }
      snapshotTest(<TableHeader {...props} />)
    })
  })
  describe('Functions', () => {
    it('saves width', () => {
      const props = {
        saveWidth: jasmine.createSpy(),
        label: 'something',
      }
      const instance = shallow(<TableHeader {...props} />).instance()
      instance.setState({width: 10})
      instance.saveWidth()
      expect(props.saveWidth).toHaveBeenCalledWith(props.label, 10)
    })
  })
  describe('Sets Width', () => {
    let instance
    beforeEach(() => {
      instance = shallow(<TableHeader />).instance()
      instance.setState({width: 50})
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
