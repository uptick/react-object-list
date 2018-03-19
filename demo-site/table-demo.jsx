import React from 'react'
import ReactDom from 'react-dom'

// import NPMList from 'react-object-list'

class TableDemo extends React.Component {
  render() {
    return (
      <div>Table Demo</div>
    );
  }
}

var mount = document.querySelectorAll('div.demo-mount-table');
ReactDom.render(
  <TableDemo />,
  mount[0]
);
