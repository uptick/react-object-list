import React from 'react'
import ReactDom from 'react-dom'

// import ObjectList from 'react-object-list'

class SimpleDemo extends React.Component {
  render() {
    return (
      <div>Simple Demo</div>
    );
  }
}

var mount = document.querySelectorAll('div.demo-mount-simple');
ReactDom.render(
  <SimpleDemo />,
  mount[0]
);
