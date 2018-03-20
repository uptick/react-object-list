import React from 'react'
import PropTypes from 'prop-types'
import TextAttr from './TextAttr'
import Empty from './Empty'
import ObjectLink from './ObjectLink'

/**
 * When an object has a foreign key, this component is used to
 * help display the information on the item related to the item
 * being rendered
 */
class Relation extends React.Component {
  static propTypes = {
    /** whether or not to display a link to the related item */
    showLink: PropTypes.bool,
    /** whether or not there is another related item within the first related item */
    nested: PropTypes.bool,
    /** the attribute or data property to use as display text */
    display: PropTypes.string,
    /** extra information to extract from attributes to display to the screen */
    detail: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),
    /** the json data on the related object */
    value: PropTypes.object,
    /** the reverse key to use when generating a link eg. "clients:client_detail" */
    reverse: PropTypes.string,
    /** className to use for data displayed through "detail" prop */
    classNames: PropTypes.string,
    /** renderer to use when displaying the linked object */
    renderer: PropTypes.func,
    /** props to pass down to the renderer */
    renderProps: PropTypes.object,
    tag: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),
  }
  static defaultProps = {
    showLink: true,
    nested: false,
    display: '__str__',
    renderer: TextAttr,
    classNames: '',
    renderProps: {},
    tag: null,
  }
  getPart(part, defaultClassNames) {
    if (part) {
      let partAttr
      const attrs = this.props.value.data.attributes || {}
      switch (typeof part) {
        case 'object':
          if ('display' in part) {
            if ('relation' in part) {
              return (
                <Relation
                  nested
                  value={this.props.value.data.relationships[part.relation]}
                  detail={part.display}
                  classNames={part.classNames || defaultClassNames}
                  showLink={false}
                />
              )
            } else {
              partAttr = part.display
            }
          }
          break
        case 'string':
          partAttr = part
          break
      }
      if (partAttr && partAttr in attrs) {
        return (<div className={this.props.classNames}>{attrs[partAttr]}</div>)
      }
    }
    return null
  }
  render() {
    let secondaryText
    let tag
    if (!(this.props.value && 'data' in this.props.value && this.props.value.data)) {
      return (<Empty />)
    }
    tag = this.getPart(this.props.tag, 'tag tag-default')
    secondaryText = this.getPart(this.props.detail, 'text-muted')
    if (this.props.nested && secondaryText) {
      return secondaryText
    }
    return (
      <div className={this.props.classNames} >
        {tag}
        <ObjectLink {...this.props} linked={this.props.showLink} />
        {secondaryText}
      </div>
    )
  }
}

export default Relation
