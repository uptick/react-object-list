import 'raf/polyfill'
import renderer from 'react-test-renderer'
import { configure } from 'enzyme'
import moment from 'moment'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
Date.now = jest.fn(() => new Date(Date.UTC(2017, 6, 15)).valueOf())
moment.prototype.local = function() { return this.utcOffset('+10:00') }

jest.mock('../__mocks__/react-select')

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
