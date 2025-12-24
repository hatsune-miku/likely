export function promise(value: any): boolean {
  return (
    value instanceof Promise ||
    (typeof value === 'object' &&
      value !== null &&
      typeof value.then === 'function') ||
    (typeof value === 'function' && value.constructor?.name === 'Promise')
  )
}
