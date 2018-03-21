import React from 'react'
import { shallow } from 'enzyme'

import ObjectList from '../'

describe('ObjectList', () => {
  describe('Functions', () => {
    const props = {
      selectItems: jest.fn(),
    }

    it('handles selectAll correctly', () => {
      spyOn(props, 'selectItems')
      const instance = shallow(<ObjectList {...props} />).instance()
      instance.selectAll()
      expect(props.selectItems).toHaveBeenCalledWith('all')
    })

    it('handles deselectAll correctly', () => {
      spyOn(props, 'selectItems')
      const instance = shallow(<ObjectList {...props} />).instance()
      instance.deselectAll()
      expect(props.selectItems).toHaveBeenCalledWith(null)
    })
  })
})
