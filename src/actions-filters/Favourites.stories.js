import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { action } from '@storybook/addon-actions'

import Favourites from './Favourites'

const defaultFilterValues = {
  filters: {},
  activeSort: '-id',
  optionalFields: {},
  activeFilters: {},
}

const defaultProps = {
  favourites: [
    {
      name: 'Favourite 1',
      ...defaultFilterValues,
    },
    {
      name: 'Favourite 2',
      ...defaultFilterValues,
      optionalFields: {name: true},
    },
  ],
  handleDeleteFavourite: action('deleteFavourite'),
  handleAddFavourite: action('addFavourite'),
}

storiesOf('object-list/Favourites', module)
  .addDecorator((story, context) => withInfo(
    'Favourites dropdown selector'
  )(story)(context))
  .add('default view', () => (
    <div style={{marginLeft: '5em'}}>
      <Favourites {...defaultProps} />
    </div>
  )).add('interactive', () => {
    class FavouritesWrapper extends React.Component {
      state = {favourites: defaultProps.favourites}
      addFavourite = (favName) => this.setState(({favourites}) =>
        ({favourites: favourites.filter(({name}) => name !== favName).concat({name: favName, ...defaultFilterValues})}))
      deleteFavourite = (favName) => this.setState(({favourites}) =>
        ({favourites: favourites.filter(({name}) => name !== favName)}))
      render() {
        return (
          <Favourites
            favourites={this.state.favourites}
            handleAddFavourite={this.addFavourite}
            handleDeleteFavourite={this.deleteFavourite}
            loadFavourite={action('loadFavourites')}
          />)
      }
    }
    return (
      <div style={{marginLeft: '5em'}}>
        <FavouritesWrapper />
      </div>
    )
  })
