Date.now = jest.fn(() => new Date(Date.UTC(2017, 6, 15)).valueOf())
const realMoment = require.requireActual('moment')
const moment = date => {
  const mockMoment = realMoment(date)
  mockMoment.local = () => mockMoment.utcOffset('+10:00')
  return mockMoment
}
moment.utc = realMoment.utc

export default moment
