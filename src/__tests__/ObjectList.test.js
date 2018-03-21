import React from 'react'
import { shallow } from 'enzyme'

import ObjectList from '../'

describe('ObjectList', () => {
  describe('state', () => {
    it('sets itemSingleName/itemPluralName to "item/items" if unset', () => {
      const instance = shallow(<ObjectList />).instance()
      expect(instance.state.itemSingleName).toBe('item')
      expect(instance.state.itemPluralName).toBe('items')
    })

    it('sets itemSingleName/itemPluralName to "blah/blahs" if only itemSingleName set', () => {
      const instance = shallow(<ObjectList itemSingleName="blah" />).instance()
      expect(instance.state.itemSingleName).toBe('blah')
      expect(instance.state.itemPluralName).toBe('blahs')
    })

    it('sets itemSingleName/itemPluralName to "blah/blahies" if both names set', () => {
      const instance = shallow(<ObjectList itemSingleName="blah" itemPluralName="blahies" />).instance()
      expect(instance.state.itemSingleName).toBe('blah')
      expect(instance.state.itemPluralName).toBe('blahies')
    })
  })

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
