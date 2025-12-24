export function json(value: any): boolean {
  switch (typeof value) {
    case 'object': {
      return value !== null
    }

    case 'string': {
      try {
        JSON.parse(value)
        return true
      } catch (_) {
        return false
      }
    }

    default: {
      return false
    }
  }
}
