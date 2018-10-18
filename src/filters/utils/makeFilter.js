import React from 'react'
import PropTypes from 'prop-types'
import FilterLabel from './FilterLabel'
import FilterComparison from './FilterComparison'
import RemoveFilter from './RemoveFilter'
import {FILTER_BASE_TYPE} from '../../utils/proptypes'

/**
 * Utility function to make a filter class with
 * the provided Renderer for its value input
 * @param  {React.Component} Renderer Component used to render input
 * @return {React.Component}          Component used to render filter
 */
const makeFilter = (Renderer) => {
  /**
   * Base filter class
   * Renderers common label, comparison and remove components
   */
  class Filter extends React.Component {
    static propTypes = {
      ...FILTER_BASE_TYPE,
      ...Renderer.propTypes,
      /** Function to be called when filter is updated */
      onChange: PropTypes.func.isRequired,
      /** Function to be called when filter is removed */
      removeFilter: PropTypes.func.isRequired,
      /** Options to be passed to the comparison dropdown */
      comparisonOptions: FilterComparison.propTypes.options,
      /** Currently selected comparison option */
      comparison: FilterComparison.propTypes.value,
      /** Icons */
      icons: PropTypes.object,
    }

    static defaultProps = {
      comparisonOptions: [],
      icons: {},
      permanent: false,
    }

    /**
     * Handler to call onChange with the newly selected comparison
     * along with the other filter options - only if it has changed
     * @param newComparison Comparison just selected
     */
    onComparisonChange = (newComparison) => {
      const {filterKey, value, comparison} = this.props
      if (newComparison !== comparison) {
        this.props.onChange({filter: filterKey, comparison: newComparison, value: value})
      }
    }

    /**
     * Handler to call onChange with the new value
     * along with other filter options - only if it has changed
     * @param newValue Value just entered
     */
    onValueChange = (newValue) => {
      const {filterKey, value, comparison} = this.props
      if (newValue !== value) {
        this.props.onChange({filter: filterKey, comparison: comparison, value: newValue})
      }
    }

    /**
     * Handler to call removeFilter with the filter key
     * @param  {MouseEvent} event onClick event
     */
    removeFilter = (event) => {
      const {removeFilter, filterKey} = this.props
      event.preventDefault()
      removeFilter(filterKey)
    }

    render() {
      const {
        name, comparison, comparisonOptions, value, permanent, icons = {}, ...otherProps
      } = this.props
      return (
        <div className="objectlist-row">
          {name && <FilterLabel label={name} />}
          {!!comparisonOptions.length && (
            <FilterComparison
              options={comparisonOptions}
              value={comparison || comparisonOptions[0]}
              onChange={this.onComparisonChange}
            />
          )}
          <Renderer
            {...otherProps}
            comparison={comparison || comparisonOptions[0]}
            value={value}
            onChange={this.onValueChange}
            icons={icons}
          />
          {!permanent && (
            <RemoveFilter onClick={this.removeFilter} Icon={icons.RemoveFilter} />
          )}
        </div>
      )
    }
  }
  return Filter
}

export default makeFilter
