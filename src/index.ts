import { eq } from './eq'

/**
 * Callable object that provides loose comparison utilities.
 * Calling likely() is equivalent to calling likely.eq()
 */
function likely(a: any, b: any): boolean {
  return eq(a, b)
}

// Attach eq as a property to make likely.eq() available
likely.eq = eq

// Export as named export (not default)
export { likely }
