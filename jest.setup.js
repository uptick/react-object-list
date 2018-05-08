import 'raf/polyfill'
import {configure} from 'enzyme'
import moment from 'moment'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
Date.now = jest.fn(() => new Date(Date.UTC(2017, 6, 15)).valueOf())
moment.prototype.local = function() { return this.utcOffset('+10:00') }
