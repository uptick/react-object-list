import React from 'react'
import PropTypes from 'prop-types'
import TextAttr from './TextAttr'
import Empty from './Empty'

/**
 * Used when an item has a reference to another object eg. Property->Client
 * to display a link to the client information page
 */
class ObjectLink extends React.Component {
  static propTypes = {
    value: PropTypes.object,
    /** the url to display when linking to the object */
    url: PropTypes.string,
    /** display an anchor tag to link to the object */
    linked: PropTypes.bool,
    /** the renderer used to display the link to the object */
    renderer: PropTypes.func,
    /** props to pass down to the renderer */
    renderProps: PropTypes.object,
  }
  static defaultProps = {
    linked: true,
    renderer: TextAttr,
    renderProps: {},
  }
  render() {
    if (!(this.props.value && 'data' in this.props.value && this.props.value.data)) {
      return <Empty />
    }
    const data = this.props.value.data
    const attrs = data.attributes || {}
    let link
    if (this.props.linked && (attrs.__web_url__ || attrs.get_absolute_url)) {
      link = attrs.__web_url__ || attrs.get_absolute_url
    } else if (this.props.url) {
      link = this.props.url
    }
    const allProps = {...this.props, ...this.props.renderProps}
    let rendered = <this.props.renderer {...allProps} />
    if (rendered) {
      rendered = (<div>{rendered}</div>)
      if (link) {
        rendered = (<a href={link}>{rendered}</a>)
      }
      return rendered
    }
    return <Empty />
  }
}

export default ObjectLink
