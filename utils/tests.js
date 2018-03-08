import renderer from 'react-test-renderer'
/**
 * Helper function to run a snapshot test on an element
 * @param  {Object} elem            React Component with props i.e. <AnyComponent a=b />
 * @param  {Object} [newState=null] (Optional) State to set component to for snapshot
 */
export function snapshotTest(elem, newState = null) {
  const rendered = renderer.create(elem)
  if (newState) {
    const instance = rendered.getInstance()
    instance.setState({
      ...instance.state,
      ...newState,
    })
  }
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
}
