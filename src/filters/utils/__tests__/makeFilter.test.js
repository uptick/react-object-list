import React from 'react'
import PropTypes from 'prop-types'
import { shallow } from 'enzyme'
import { snapshotTest } from 'utils/tests'
import makeFilter from '../makeFilter'

jest.mock('../FilterLabel', () => 'FilterLabel')
jest.mock('../FilterComparison')
jest.mock('../RemoveFilter', () => 'RemoveFilter')

class DummyRenderer extends React.Component {
  static propTypes = {
    a: PropTypes.number,
    b: PropTypes.string,
  }
  render() {
    return <div>{`${this.props.a} ${this.props.b}`}</div>
  }
}
describe('makeFilter', () => {
  let GeneratedFilter
  beforeEach(() => {
    GeneratedFilter = makeFilter(DummyRenderer)
  })
  const baseProps = {
    onChange: jest.fn(),
    removeFilter: jest.fn(),
    filterKey: 'thisfilter',
    value: 912,
    comparison: 'test',
    a: 44,
    b: 'tests',
  }
  describe('Snapshots', () => {
    it('renders default', () => snapshotTest(<GeneratedFilter {...baseProps} />))
    it('renders with comparison options', () => {
      snapshotTest(
        <GeneratedFilter
          {...baseProps}
          comparisonOptions={[
            {value: 'test', label: 'Test'},
            {value: 'again', label: 'Test Again'},
          ]}
          comparison={null}
        />
      )
    })
    it('renders with comparison null', () => {
      snapshotTest(
        <GeneratedFilter
          {...baseProps}
          comparisonOptions={[
            {value: 'test', label: 'Test'},
            {value: 'again', label: 'Test Again'},
          ]}
          comparison={null}
        />
      )
    })
    it('renders with permanent true', () => {
      snapshotTest(
        <GeneratedFilter
          {...baseProps}
          permanent
        />
      )
    })
    it('has a name', () => {
      snapshotTest(
        <GeneratedFilter
          {...baseProps}
          name="The Awesome Filter"
        />
      )
    })
  })
  describe('Generates filter', () => {
    it('takes prop types from Renderer', () => {
      expect(GeneratedFilter.propTypes).toEqual(jasmine.objectContaining(DummyRenderer.propTypes))
    })
    describe('Functions', () => {
      let instance
      beforeEach(() => {
        spyOn(baseProps, 'onChange')
        spyOn(baseProps, 'removeFilter')
        instance = shallow(<GeneratedFilter {...baseProps} />).instance()
      })
      describe('handles comparison change', () => {
        it('has change', () => {
          instance.onComparisonChange('apple')
          expect(baseProps.onChange).toHaveBeenCalledWith({
            filter: baseProps.filterKey,
            comparison: 'apple',
            value: baseProps.value,
          })
        })
        it('has no change', () => {
          instance.onComparisonChange(baseProps.comparison)
          expect(baseProps.onChange).not.toHaveBeenCalled()
        })
      })
      describe('handles value change', () => {
        it('has change', () => {
          instance.onValueChange(321)
          expect(baseProps.onChange).toHaveBeenCalledWith({
            filter: baseProps.filterKey,
            comparison: baseProps.comparison,
            value: 321,
          })
        })
        it('has no change', () => {
          instance.onValueChange(baseProps.value)
          expect(baseProps.onChange).not.toHaveBeenCalled()
        })
      })
      it('removes filter', () => {
        const mockEvent = {preventDefault: jasmine.createSpy()}
        instance.removeFilter(mockEvent)
        expect(mockEvent.preventDefault).toHaveBeenCalled()
        expect(baseProps.removeFilter).toHaveBeenCalledWith(baseProps.filterKey)
      })
    })
  })
})
