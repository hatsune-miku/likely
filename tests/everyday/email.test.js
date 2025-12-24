const { likely } = require('../../dist/index')

const email = likely.email

describe('email', () => {
  describe('valid email addresses', () => {
    it('should return true for valid email addresses', () => {
      expect(email('test@example.com')).toBe(true)
      expect(email('test+123@example.com')).toBe(true)
      expect(email('test-123@example.com')).toBe(true)
      expect(email('test_123@example.com')).toBe(true)
      expect(email('test.123@example.com')).toBe(true)
      expect(email('test@example.co.uk')).toBe(true)
      expect(email('test@example.com.br')).toBe(true)

      // According to RFC 5321 / RFC 5322, yes.
      expect(email('test@example.com.')).toBe(true)
    })
  })

  describe('invalid email addresses', () => {
    it('should return false for invalid email addresses', () => {
      expect(email('test@example')).toBe(false)
    })
  })
})
