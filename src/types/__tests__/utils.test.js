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

    it('handles null', () => {
      const result = currency(null)
      expect(result).toBe('$0.00')
    })

    it('handles nan', () => {
      const result = currency(NaN)
      expect(result).toBe('$0.00')
    })
  })
})
