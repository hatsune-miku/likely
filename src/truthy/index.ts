import { eq } from '../eq'

const TrivialFalsyPatterns = [
  'false',
  'no',
  'error',
  'fail',
  '0',
  'null',
  'undefined',
  'nan',
  'n/a',
  'nil',
  'none',
  'void',
]

export function truthy(value: any): boolean {
  if (!value) {
    return false
  }
  switch (typeof value) {
    case 'number': {
      return !Number.isNaN(value)
    }
    case 'boolean': {
      return value
    }
    case 'object': {
      return value !== null
    }
    case 'function': {
      return true
    }
    case 'bigint': {
      return Boolean(value)
    }
    case 'symbol': {
      return true
    }
    case 'undefined': {
      return false
    }

    // string fallthrough
  }

  if (TrivialFalsyPatterns.some((p) => eq(p, value))) {
    return false
  }
  return true
}
