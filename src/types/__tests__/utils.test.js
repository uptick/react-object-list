import { currency } from '../utils'

describe('utils', () => {
  describe('currency', () => {
    it('handles floats with appropriate truncation', () => {
      const result = currency(1.2251)
      expect(result).toBe('$1.23')
    })

    it('handles negative floats', () => {
      const result = currency(-12.555)
      expect(result).toBe('-$12.56')
    })
  })
})
