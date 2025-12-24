/**
 * Checks if `value` can be attached new properties.
 */
export function writable(value: any): boolean {
  try {
    value.__likely_writable_test = 1
    delete value.__likely_writable_test
    return true
  } catch (_) {
    return false
  }
}
