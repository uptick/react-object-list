import React from 'react'
import { shallow } from 'enzyme'
import { snapshotTest } from 'utils/tests'
import Favourites from '../Favourites'

jest.mock('../FavouritesItem', () => 'FavouritesItem')

describe('Favourites', () => {
  describe('Snapshot', () => {
    const defaultProps = {
      favourites: [
        {
          name: 'Favourite 1',
          filters: {},
          activeSort: '-id',
          optionalFields: {},
        },
        {
          name: 'Favourite 2',
          filters: {},
          activeSort: '-id',
          optionalFields: {name: true},
        },
      ],
      handleDeleteFavourite: jest.fn(),
      handleAddFavourite: jest.fn(),
    }
    afterEach(() => {
      defaultProps.handleAddFavourite.mockClear()
      defaultProps.handleDeleteFavourite.mockClear()
    })

    it('renders correctly', () => {
      snapshotTest(<Favourites {...defaultProps} />)
    })
  })

  describe('Functions', () => {
    it('calls componentWillReceiveProps correctly', () => {
      const wrapper = shallow(<Favourites selectedFavouriteName="A" />)
      const instance = wrapper.instance()
      spyOn(instance, 'render')
      expect(instance.props.selectedFavouriteName).toBe('A')

      instance.render.calls.reset()
      wrapper.setProps({selectedFavouriteName: 'A'})
      expect(instance.props.selectedFavouriteName).toBe('A')
      expect(instance.render).toHaveBeenCalledTimes(1)

      instance.render.calls.reset()
      wrapper.setProps({selectedFavouriteName: 'B'})
      expect(instance.props.selectedFavouriteName).toBe('B')
      expect(instance.render).toHaveBeenCalledTimes(2)
    })

    describe('handleDropdown', () => {
      let instance
      beforeEach(() => {
        instance = shallow(<Favourites />).instance()
        instance.refs = {
          favouritesButton: 'favBut',
          newFavouriteName: 'favNym',
          favouritesDropdown: {
            contains: jest.fn(foo => foo === 'bar'),
          },
        }
      })

      it('starts closed', () => {
        expect(instance.state.favouritesOpen).toBe(false)
      })

      it('toggles dropdown on favouritesButton press', () => {
        instance.handleDropdown({target: 'favBut'})
        expect(instance.state.favouritesOpen).toBe(true)
        instance.handleDropdown({target: 'favBut'})
        expect(instance.state.favouritesOpen).toBe(false)
      })

      it('opens dropdown on newFavouriteName press', () => {
        instance.handleDropdown({target: 'favNym'})
        expect(instance.state.favouritesOpen).toBe(true)
      })

      it('opens dropdown on child of favouritesDropdown press', () => {
        instance.handleDropdown({target: 'bar'})
        expect(instance.state.favouritesOpen).toBe(true)
      })

      it('closes dropdown otherwise', () => {
        // Unrecognised target
        instance.handleDropdown({target: 'bard'})
        expect(instance.state.favouritesOpen).toBe(false)
        // No favourites dropdown
        instance.refs.favouritesDropdown = null
        instance.handleDropdown({target: 'bar'})
        expect(instance.state.favouritesOpen).toBe(false)
      })
    })

    describe('handleAddFavourite ', () => {
      const props = {
        handleAddFavourite: jest.fn(),
      }

      it('adds new favourite to list and clears its draft from state', () => {
        spyOn(props, 'handleAddFavourite')
        const instance = shallow(<Favourites {...props} />).instance()
        instance.setState({newFavouriteName: 'barbara'})
        const mockEvent = {preventDefault: jasmine.createSpy()}
        instance.handleAddFavourite(mockEvent)
        expect(mockEvent.preventDefault).toHaveBeenCalled()
        expect(props.handleAddFavourite).toHaveBeenCalledWith('barbara')
        expect(instance.state.newFavouriteName).toBe('')
        expect(instance.state.selectedFavouriteName).toBe('barbara')
      })
    })

    describe('handleFavouriteNameChange ', () => {
      it('adds new favourite to list and clears its draft from state', () => {
        const instance = shallow(<Favourites />).instance()
        instance.refs = {newFavouriteName: {value: 'Pit_Droid-2'}}
        instance.handleFavouriteNameChange()
        expect(instance.state.newFavouriteName).toBe('PitDroid-2')
      })
    })
  })
})
