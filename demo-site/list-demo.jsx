import React from 'react'
import ReactDom from 'react-dom'

// import ObjectList from 'react-object-list'

class ListDemo extends React.Component {
  render() {
    return (
      <div>List Demo</div>
    )
  }
}

const mount = document.querySelectorAll('div.demo-mount-list')
ReactDom.render(
  <ListDemo />,
  mount[0]
)
