import React from 'react'
import PropTypes from 'prop-types'
import Empty from './Empty'

/**
 * Extracts and displays data from a JSON structure
 */
class TextAttr extends React.Component {
  static propTypes = {
    /** object to display eg. { data: { id: 1234, type: "Property", attributes: {name: "name of property", ref: "refcode"}} } */
    value: PropTypes.object,
    /** which of the attributes or data values to use as displaytext */
    display: PropTypes.string,
    identifier: PropTypes.string,
    subtext: PropTypes.string,
  }
  static defaultProps = {
    display: '__str__',
  }
  render() {
    if (!(this.props.value && 'data' in this.props.value && this.props.value.data)) {
      return <Empty />
    }
    const data = this.props.value.data
    let text = `${data.type} ${data.id}`
    const attrs = data.attributes || {}
    if (this.props.display) {
      if (this.props.display in attrs) {
        text = attrs[this.props.display]
      } else if (this.props.display in data) {
        text = data[this.props.display]
      }
    }
    let identifier
    if (this.props.identifier) {
      if (this.props.identifier in attrs) {
        identifier = attrs[this.props.identifier]
      } else if (this.props.identifier in data) {
        identifier = data[this.props.identifier]
      }
    }
    let subtext
    if (this.props.subtext) {
      if (this.props.subtext in attrs) {
        subtext = attrs[this.props.subtext]
      } else if (this.props.subtext in data) {
        subtext = data[this.props.subtext]
      }
    }
    return (
      <div>
        <div>
          {identifier && <small className="text-muted">{identifier} </small>}
          {(text && text.length) ? text : <Empty />}
        </div>
        {subtext && <small className="text-muted">{subtext}</small>}
      </div>
    )
  }
}

export default TextAttr
