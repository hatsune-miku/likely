/**
 * Compares two values in a very loose way and returns whether they are likely the same.
 *
 * Comparison rules:
 * - Uses == instead of === (allows type coercion)
 * - Cross-type comparison is allowed
 * - Strings are trimmed of \n, \r, \t, and spaces before comparison
 * - Floating point numbers are compared with epsilon tolerance to handle IEEE-754 precision errors
 *
 * @param a - First value to compare
 * @param b - Second value to compare
 * @returns true if values are likely equal, false otherwise
 */
export function eq(a: any, b: any): boolean {
  const trimWhitespace = (s: string): string => {
    // Remove all \n, \r, \t, and space characters
    return s.replace(/[\n\r\t ]/g, '')
  }

  // Trim strings before comparison
  const aTrimmed = typeof a === 'string' ? trimWhitespace(a) : a
  const bTrimmed = typeof b === 'string' ? trimWhitespace(b) : b

  // Handle number comparison with floating point precision tolerance
  if (typeof aTrimmed === 'number' && typeof bTrimmed === 'number') {
    // Special case: NaN should use default == behavior (false)
    if (Number.isNaN(aTrimmed) || Number.isNaN(bTrimmed)) {
      // eslint-disable-next-line eqeqeq
      return aTrimmed == bTrimmed
    }

    // Special case: Infinity should use === for proper comparison
    if (!Number.isFinite(aTrimmed) || !Number.isFinite(bTrimmed)) {
      return aTrimmed === bTrimmed
    }

    // Check if either number has decimal places (is not an integer)
    if (!Number.isInteger(aTrimmed) || !Number.isInteger(bTrimmed)) {
      // Use epsilon comparison to handle IEEE-754 precision errors
      // e.g., 0.1 + 0.2 === 0.3 should be true despite 0.30000000000000004
      const EPSILON = 1e-9
      return Math.abs(aTrimmed - bTrimmed) < EPSILON
    }
  }

  // Default loose comparison using ==
  // eslint-disable-next-line eqeqeq
  return aTrimmed == bTrimmed
}
