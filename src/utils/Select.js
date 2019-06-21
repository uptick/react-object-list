import React from 'react'
import PropTypes from 'prop-types'
import ReactSelect, { components } from 'react-select'
import ReactAsyncSelect from 'react-select/lib/Async'
const {Option} = components

// A searchable set of props to ignore when checking for
// unknown props.
const KNOWN_PROPS = new Set([
  'options', 'value', 'onChange',
  'placeholder', 'className', 'name',
  'filterOption', 'cacheOptions',
])

/**
 * Convert a set of props according to an object of transforms.
 *
 * A helper function to assist in translating props from one format
 * to another. The transforms are an object whose keys are the
 * source prop name, and whose values are an array with two
 * elements. The first is the name of the destination prop, the
 * second is a function that returns the new prop value. The
 * function takes the source prop value.
 *
 * @returns The transformed props.
 */
function convertProps(props, transforms) {
  const nextProps = {}
  for (const [src, [dst, op]] of Object.entries(transforms)) {
    const value = props[src]
    if (value !== undefined) {
      nextProps[dst] = op ? op(value) : value
    }
  }

  // remove props that are not required
  delete props.resetValue
  delete props.required

  // Complain loudly if there are any props that we've not
  // been able to understand.
  for (const attr of Object.keys(props)) {
    if (KNOWN_PROPS.has(attr)) {
      nextProps[attr] = props[attr]
    } else if (!transforms.hasOwnProperty(attr)) {
      throw new Error(
        `Unknown prop during wrapping of react-select v1 to v2: ${attr}`
      )
    }
  }

  return nextProps
}

/**
 * A thin wrapper around react-select.
 *
 * This wrapper makes it easy to shift between versions of
 * react-select. We tended to use react-select in many different
 * places, meaning if the API changed we'd need to update our
 * code everywhere. This way we can keep an internally consistent
 * interface and change this wrapper only.
 *
 * The current mapping defined here is that for converting from
 * react-select v1 to v2.
 */
class Select extends React.Component {
  static propTypes = {
    isAsync: PropTypes.bool,
    optionRenderer: PropTypes.func,
    controlStyle: PropTypes.object,
    menuStyle: PropTypes.object,
    menuContainerStyle: PropTypes.object,
    value: PropTypes.any,
    inputProps: PropTypes.object,
  }

  state = {
    startedTyping: false,
  }

  handleInputChange = inputValue => {
    this.setState({startedTyping: !!inputValue.length})
  }

  render() {
    const {
      isAsync = false,
      controlStyle,
      menuStyle,
      menuContainerStyle,
      optionRenderer,
      inputProps,
      ...otherProps
    } = this.props

    // Convert props semi-automatically.
    const nextProps = convertProps(otherProps, {
      valueKey: ['getOptionValue', v => o => o[v]],
      labelKey: ['getOptionLabel', v => o => o[v]],
      disabled: ['isDisabled'],
      multi: ['isMulti'],
      clearable: ['isClearable'],
      openOnFocus: ['openMenuOnClick'],
      cache: ['cacheOptions'],
      editable: ['isDisabled', editable => !editable],
      autoload: ['defaultOptions'],
      noResultsText: ['noOptionsMessage', text => () => {
        if (this.state.startedTyping) {
          return text
        }
        return 'Start typing to search...'
      }],
      onInputKeyDown: ['onKeyDown'],
      loadOptions: ['loadOptions', fn => (inputValue, callback) => {
        if (callback === undefined) {
          return fn(inputValue) // TODO: check value of this is ok
        } else {
          // This is an ugly hack to ensure we support Promise loading as well as callbacks
          // https://deploy-preview-2289--react-select.netlify.com/async
          // We assume that if the loadOptions function takes 2 arguments, the second is a callback
          if (fn.length === 2) {
            // eslint-disable-next-line handle-callback-err
            fn(inputValue, (err, data) => {
              callback(data.options)
            })
          } else {
            // Assume function takes just one argument, inputValue
            const data = fn(inputValue)
            // Check if the function returned a promise
            if (typeof data.then === 'function') {
              // Wait for result, and call callback
              data.then(({options}) => callback(options))
            } else {
              // Otherwise just call callback straight away
              callback(data.options)
            }
          }
        }
      }],
    })

    // Component overrides are a bit more difficult, and can't be
    // perfectly mapped. We'll need to update our code to work with
    // V2.
    const components = {}
    if (optionRenderer) {
      components.Option = props => <Option {...props}>{optionRenderer(props.data)}</Option>
    }
    if (inputProps) {
      components.innerProps = inputProps
    }
    if (Object.keys(components).length > 0) {
      nextProps.components = components
    }

    // Style overrides are a bit trickier too.
    const styles = {
      control: (base, state) => ({
        ...base,
        ...(controlStyle || {}),
        backgroundColor: '#fff',
        borderRadius: '2px',
        borderColor: '#ced4da',
        outline: '0',
        boxShadow: 0,
        minHeight: 0,
        fontSize: '0.85rem',
        '&:hover': {
          borderColor: '#ced4da',
        },
        '&:active': {
          borderColor: '#ced4da',
        },
      }),
      indicatorContainer: (base, state) => ({
        ...base,
        color: '#00A19C',
      }),
      input: (base, state) => ({
        ...base,
        borderRadius: '2px',
      }),
      option: (base, state) => ({
        ...base,
        fontSize: '0.85rem',
        '&:hover': {
          background: '#f0f9f9',
        },
        '&:active': {
          background: '#f0f9f9',
        },
        '&:first-child': {
          background: '#fff',
          color: 'black',
          opacity: '0.84',
          '&:hover': {
            background: '#f0f9f9',
          },
        },
      }),
      menuList: (base, state) => ({
        ...base,
        borderRadius: '2px',
      }),
      dropdownIndicator: (base, state) => ({
        ...base,
        color: '#00A19C',
      }),
      multiValue: (base, state) => ({
        ...base,
        backgroundColor: 'rgba(0,126,255,0.08)',
        border: '1px solid rgba(0,126,255,0.24)',
        color: '#00A19C',
        '&:active': {
          background: '#f0f9f9',
        },
      }),
      multiValueLabel: (base, state) => ({
        ...base,
        color: '#00A19C',
        borderRight: '1px solid rgba(0,126,255,0.24)',
        fontSize: '0.85rem',
      }),
    }
    if (menuStyle) {
      styles.menu = (base, state) => ({...base, ...menuStyle})
    }
    if (menuContainerStyle) {
      styles.menuList = (base, state) => ({...base, ...menuContainerStyle})
    }
    if (Object.keys(styles).length > 0) {
      nextProps.styles = styles
    }

    const Component = isAsync ? ReactAsyncSelect : ReactSelect
    return (
      <Component {...nextProps} onInputChange={this.handleInputChange} />
    )
  }
}

class AsyncSelect extends React.Component {
  static propTypes = {
    noResultsText: PropTypes.string,
  }

  render() {
    return (
      <Select
        {...this.props}
        noResultsText={this.props.noResultsText || 'No Options'}
        cacheOptions
        isAsync
      />
    )
  }
}

Select.Async = AsyncSelect

export default Select
