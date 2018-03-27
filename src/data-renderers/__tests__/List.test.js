import React from 'react'
import { shallow } from 'enzyme'
import List from '../List'

jest.mock('../../utils/functions', () => ({
  getVisibleColumns: (a, b) => [...a, ...b],
  setColumnLabels: input => input,
}))
jest.mock('../Overlay', () => 'Overlay')

describe('List', () => {
  describe('Lifecycle', () => {
    it('componentWillReceiveProps', () => {
      const newProps = {
        columns: [{dataKey: 'a'}, {dataKey: 'b'}],
        meta: {
          extraColumns: [{dataKey: 'c'}, {dataKey: 'd'}],
        },
      }
      const instance = shallow(<List />)
      instance.instance().setState({columns: []})
      instance.setProps(newProps)
      expect(instance.instance().state.columns).toEqual([...newProps.columns, ...newProps.meta.extraColumns])
    })
  })
})
