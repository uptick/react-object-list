import React from 'react'
import { shallow } from 'enzyme'
import FavouritesItem from '../FavouritesItem'

describe('FavouritesItem', () => {
  describe('Functions', () => {
    it('loads favourite on handleClick', () => {
      const props = {
        name: 'Springfield',
        filters: {
          activeFilters: 'AF',
          optionalFields: 'OF',
          activeSort: 'AS',
        },
        loadFavourite: jest.fn(),
      }
      spyOn(props, 'loadFavourite')
      const instance = shallow(<FavouritesItem {...props} />).instance()

      const mockEvent = {preventDefault: jasmine.createSpy()}
      instance.handleClick(mockEvent)
      expect(mockEvent.preventDefault).toHaveBeenCalled()
      expect(props.loadFavourite).toHaveBeenCalledWith('Springfield', 'AF', 'OF', 'AS')
    })

    it('calls back to delete favourite on handleDelete ', () => {
      const props = {
        name: 'Shelbyville',
        handleDelete: jest.fn(),
      }
      spyOn(props, 'handleDelete')
      const instance = shallow(<FavouritesItem {...props} />).instance()

      const mockEvent = {preventDefault: jasmine.createSpy()}
      instance.handleDelete(mockEvent)
      expect(mockEvent.preventDefault).toHaveBeenCalled()
      expect(props.handleDelete).toHaveBeenCalledWith('Shelbyville')
    })
  })
})
