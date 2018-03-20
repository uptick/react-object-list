import React from 'react'
import { snapshotTest } from 'utils/tests'
import Favourites from '../Favourites'

jest.mock('../FavouritesItem', () => 'FavouritesItem')

describe('<Favourites />', () => {
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
})
