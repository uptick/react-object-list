import React from 'react'
import PropTypes from 'prop-types'

/**
 * Provided links to edit/view the current item (usually inside an objectlist)
 * generate the links required
 */
class Links extends React.Component {
  static propTypes = {
    viewUrl: PropTypes.string,
    editUrl: PropTypes.string,
    extra: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
      text: PropTypes.string,
    })),
  }

  static defaultProps = {
    extra: [],
  }

  render() {
    const links = []
    if (this.props.viewUrl) {
      links.push(
        <a
          className="btn btn-sm btn-link"
          href={this.props.viewUrl}
          key="view"
        >
          View
        </a>
      )
    }
    if (this.props.editUrl) {
      if (links.length) {
        links.push(<span key="edit-spacer">&nbsp;</span>)
      }
      links.push(
        <a
          className="btn btn-sm btn-link"
          href={this.props.editUrl}
          key="edit"
        >
          Edit
        </a>
      )
    }
    this.props.extra.forEach(({url, text}, i) => {
      links.push(
        <a
          className="btn btn-sm btn-link"
          href={url}
          key={`ex-${i}`}
        >
          {text}
        </a>
      )
    })
    return (
      <div
        className="list-actions"
      >
        {links}
      </div>
    )
  }
}

export default Links
