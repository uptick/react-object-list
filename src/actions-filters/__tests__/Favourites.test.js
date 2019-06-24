import React from 'react'
import { shallow, mount } from 'enzyme'
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
      expect(instance.render).toHaveBeenCalledTimes(1)
    })

    describe('handleDropdown', () => {
      let instance
      beforeEach(() => {
        instance = mount(<Favourites />).instance()
      })

      it('starts closed', () => {
        expect(instance.state.favouritesOpen).toBe(false)
      })

      it('toggles dropdown on favouritesButton press', () => {
        instance.handleDropdown({target: instance.favouritesButton})
        expect(instance.state.favouritesOpen).toBe(true)
        instance.handleDropdown({target: instance.favouritesButton})
        expect(instance.state.favouritesOpen).toBe(false)
      })

      it('opens dropdown on a child element of dropdown pressed', () => {
        instance.handleDropdown({
          target: {
            parentElement: {
              parentElement: instance.favouritedDropdown,
            },
          },
        })
        expect(instance.state.favouritesOpen).toBe(true)
      })
      it('closes dropdown otherwise', () => {
        // Unrecognised target
        instance.handleDropdown({target: {}})
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
        instance.newFavouriteName = {value: 'Pit_Droid-2'}
        instance.handleFavouriteNameChange()
        expect(instance.state.newFavouriteName).toBe('PitDroid-2')
      })
    })
  })
})
