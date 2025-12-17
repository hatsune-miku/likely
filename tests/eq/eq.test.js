const { likely } = require('../../dist/index')

const eq = likely.eq

describe('eq', () => {
  describe('floating point comparison', () => {
    it('should handle IEEE-754 precision errors', () => {
      expect(eq(0.1 + 0.2, 0.3)).toBe(true)
    })

    it('should handle small precision errors', () => {
      expect(eq(0.30000000004, 0.3)).toBe(true)
    })

    it('should return true for equal floats', () => {
      expect(eq(1.5, 1.5)).toBe(true)
    })

    it('should return false for different floats beyond epsilon', () => {
      expect(eq(1.5, 2.5)).toBe(false)
    })
  })

  describe('integer comparison', () => {
    it('should return true for equal integers', () => {
      expect(eq(5, 5)).toBe(true)
    })

    it('should return false for different integers', () => {
      expect(eq(5, 6)).toBe(false)
    })

    it('should handle zero', () => {
      expect(eq(0, 0)).toBe(true)
    })

    it('should handle negative integers', () => {
      expect(eq(-5, -5)).toBe(true)
      expect(eq(-5, -6)).toBe(false)
    })
  })

  describe('string trimming', () => {
    it('should trim spaces', () => {
      expect(eq('hello', '  hello  ')).toBe(true)
    })

    it('should trim newlines', () => {
      expect(eq('test\n', 'test')).toBe(true)
    })

    it('should trim carriage returns', () => {
      expect(eq('test\r', 'test')).toBe(true)
    })

    it('should trim tabs', () => {
      expect(eq('test\t', 'test')).toBe(true)
    })

    it('should trim mixed whitespace', () => {
      expect(eq('  hello\n', 'hello')).toBe(true)
      expect(eq('test\n\r\t', 'test')).toBe(true)
    })

    it('should trim all spaces within strings', () => {
      expect(eq('h e l l o', 'hello')).toBe(true)
    })

    it('should return false for different trimmed strings', () => {
      expect(eq('hello', 'world')).toBe(false)
    })
  })

  describe('cross-type comparison', () => {
    it('should compare number and string loosely', () => {
      expect(eq(42, '42')).toBe(true)
      expect(eq(5, '5')).toBe(true)
    })

    it('should compare boolean and number', () => {
      expect(eq(true, 1)).toBe(true)
      expect(eq(false, 0)).toBe(true)
    })

    it('should compare null and undefined', () => {
      expect(eq(null, undefined)).toBe(true)
    })

    it('should compare empty string and 0', () => {
      expect(eq('', 0)).toBe(true)
    })
  })

  describe('loose equality behavior', () => {
    it('should use == semantics', () => {
      expect(eq(0, false)).toBe(true)
      expect(eq('', false)).toBe(true)
    })

    it('should handle array and string comparison', () => {
      expect(eq([1, 2], '1,2')).toBe(true)
    })
  })

  describe('edge cases', () => {
    it('should handle NaN', () => {
      expect(eq(NaN, NaN)).toBe(false) // NaN != NaN in loose equality
    })

    it('should handle Infinity', () => {
      expect(eq(Infinity, Infinity)).toBe(true)
      expect(eq(-Infinity, -Infinity)).toBe(true)
    })

    it('should handle object comparison', () => {
      const obj = { a: 1 }
      expect(eq(obj, obj)).toBe(true)
      expect(eq({ a: 1 }, { a: 1 })).toBe(false) // different references
    })

    it('should handle string conversion with numbers', () => {
      expect(eq('  5  ', 5)).toBe(true)
      expect(eq('42\n', 42)).toBe(true)
    })
  })
})
