import React from 'react'
import { mount } from 'enzyme'
import { snapshotTest } from '../../../../utils/tests'
import makeFilter from '../makeFilter'

jest.mock('../FilterLabel', () => 'FilterLabel')
jest.mock('../FilterComparison', () => 'FilterComparison')
jest.mock('../RemoveFilter', () => 'RemoveFilter')

class DummyRenderer extends React.Component {
  render() {
    return <div>{`${this.props?.a} ${this.props?.b}`}</div>
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
    comparison: null,
    a: 44,
    b: 'tests',
    icons: undefined,
  }

  describe('Functions', () => {
    beforeEach(() => {
      spyOn(baseProps, 'onChange')
      spyOn(baseProps, 'removeFilter')
    })

    describe('handles comparison change', () => {
      it('has change', () => {
        const Filter = makeFilter(DummyRenderer)
        const wrapper = mount(<Filter {...baseProps}/>)

        const instance = wrapper.find('Filter').instance()

        instance.onComparisonChange('apple')

        expect(baseProps.onChange).toHaveBeenCalledWith({
          filter: baseProps.filterKey,
          comparison: 'apple',
          value: baseProps.value,
        })
      })

      it('has no change', () => {
        const Filter = makeFilter(DummyRenderer)
        const wrapper = mount(<Filter {...baseProps}/>)

        const instance = wrapper.find('Filter').instance()

        instance.onComparisonChange(baseProps.comparison)

        expect(baseProps.onChange).not.toHaveBeenCalled()
      })
    })

    describe('handles value change', () => {
      it('has change', () => {
        const Filter = makeFilter(DummyRenderer)
        const wrapper = mount(<Filter {...baseProps}/>)

        const instance = wrapper.find('Filter').instance()

        instance.onValueChange(321)

        expect(baseProps.onChange).toHaveBeenCalledWith({
          filter: baseProps.filterKey,
          comparison: baseProps.comparison,
          value: 321,
        })
      })

      it('has no change', () => {
        const Filter = makeFilter(DummyRenderer)
        const wrapper = mount(<Filter {...baseProps}/>)

        const instance = wrapper.find('Filter').instance()
        instance.onValueChange(baseProps.value)

        expect(baseProps.onChange).not.toHaveBeenCalled()
      })
    })

    it('removes filter', () => {
      const Filter = makeFilter(DummyRenderer)
      const wrapper = mount(<Filter {...baseProps}/>)

      const instance = wrapper.find('Filter').instance()

      const event = {
        preventDefault: () => console.log('hi'),
      }

      instance.removeFilter(event)

      expect(baseProps.removeFilter).toHaveBeenCalledWith(baseProps.filterKey)
    })
  })

  describe('Snapshots', () => {
    it('renders default', () => {
      snapshotTest(<GeneratedFilter {...baseProps} />)
    })

    it('renders with comparison options', () => {
      snapshotTest(
        <GeneratedFilter
          {...baseProps}
          comparisonOptions={[
            { value: 'test', label: 'Test' },
            { value: 'again', label: 'Test Again' },
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
            { value: 'test', label: 'Test' },
            { value: 'again', label: 'Test Again' },
          ]}
          comparison={null}
        />
      )
    })

    it('renders with permanent true', () => {
      snapshotTest(<GeneratedFilter {...baseProps} permanent />)
    })

    it('has a name', () => {
      snapshotTest(<GeneratedFilter {...baseProps} name="The Awesome Filter" />)
    })
  })
})
