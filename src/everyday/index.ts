export function email(value: any): boolean {
  const pattern =
    /(?:[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+(?:\.[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9\x2d]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  return typeof value === 'string' && pattern.test(value)
}

export function link(input: any) {
  if (typeof input !== 'string') return false
  const s = input.trim()
  if (!s) return false

  if (s.startsWith('javascript:')) return true

  // Omnibox won't treat whitespace-containing strings as a URL.
  // (Also blocks newline/tab tricks.)
  if (/\s/.test(s)) return false

  // 1) Any RFC3986-ish scheme => treat as link.
  // Examples: https://, mailto:, tel:, about:, view-source:, git+https:, chrome-extension:
  // NOTE: Keep scheme lowercase to match typical omnibox behavior and your tests.
  if (/^[a-z][a-z0-9+.-]*:/.test(s)) return true

  if (s.startsWith('data:')) return true
  if (s.startsWith('blob:')) return true
  if (s.startsWith('git+https:')) return true

  // From here on: "schemeless" candidates.
  // Your tests require LOCALHOST to be false, so enforce lowercase-only for these.
  if (s !== s.toLowerCase()) return false

  // Split off path/query/hash so we can validate just the host:port part.
  const hostPort = s.split(/[/?#]/, 1)[0]

  // Optional ":port" handling (only digits, 1-5 length; we don't strictly bound 65535,
  // but you can if you want).
  const mHostPort = hostPort.match(/^(.*?)(?::(\d{1,5}))?$/)
  if (!mHostPort) return false
  const host = mHostPort[1]
  const port = mHostPort[2]
  if (port && (port.length > 5 || port === '0')) {
    // "0" is technically valid in some contexts but usually not typed for navigation;
    // feel free to relax this if you want.
    // Keeping it slightly strict helps reduce false positives.
    return false
  }

  // 2) localhost (lowercase only)
  if (host === 'localhost') return true

  // 3) IPv4
  if (isIPv4(host)) return true

  // 4) Reject IPv6 literals explicitly (your tests want all IPv6 -> false)
  // (Even though some are valid addresses, you don't want them treated as links.)
  if (host.includes(':')) return false

  // 5) Domain heuristic: must contain a dot and be "domain-shaped"
  if (isDomainLike(host)) return true

  return false
}

function isIPv4(host: string) {
  // Must be exactly 4 dot-separated decimal octets 0-255.
  const parts = host.split('.')
  if (parts.length !== 4) return false
  for (const p of parts) {
    if (!/^\d{1,3}$/.test(p)) return false
    const n = Number(p)
    if (n < 0 || n > 255) return false
  }
  return true
}

function isDomainLike(host: string) {
  // Basic sanity
  if (host.length > 253) return false
  if (!host.includes('.')) return false
  if (host.startsWith('.') || host.endsWith('.')) return false
  if (host.includes('..')) return false

  const labels = host.split('.')
  if (labels.some((l) => l.length === 0 || l.length > 63)) return false

  // Validate each label: [a-z0-9-], not starting/ending with '-'
  for (const label of labels) {
    if (!/^[a-z0-9-]+$/.test(label)) return false
    if (label.startsWith('-') || label.endsWith('-')) return false
  }

  // TLD heuristic: either all letters (2-63) or punycode xn--...
  const tld = labels[labels.length - 1]
  if (/^[a-z]{2,63}$/.test(tld)) return true
  if (/^xn--[a-z0-9-]{2,59}$/.test(tld)) return true

  return false
}

export function ipv4(input: any) {
  if (typeof input !== 'string') return false
  return isIPv4(input)
}

export function hex(input: any) {
  if (typeof input !== 'string') return false
  input = input.trim().replace(/^0x/, '')
  if (!input) return false

  return /^[0-9a-fA-F]+$/.test(input)
}
