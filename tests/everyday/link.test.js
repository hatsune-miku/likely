const { likely } = require('../../dist/index')

const link = likely.link

describe('link', () => {
  describe('valid links', () => {
    it('should return true for valid links', () => {
      expect(link('localhost')).toBe(true)
      expect(link('1.1.1.1')).toBe(true)

      expect(link('https://example.com')).toBe(true)
      expect(link('http://example.com')).toBe(true)
      expect(link('https://example.com/test')).toBe(true)
      expect(link('http://example.com/test')).toBe(true)
      expect(link('file://example.com')).toBe(true)
      expect(link('ftp://example.com')).toBe(true)
      expect(link('mailto:test@example.com')).toBe(true)
      expect(link('tel:1234567890')).toBe(true)
      expect(link('sms:1234567890')).toBe(true)
      expect(
        link('data:text/html;base64,PHRpdGxlPkhlbGxvIFdvcmxkPC90aXRsZT4=')
      ).toBe(true)
      expect(link('javascript:alert("Hello, World!")')).toBe(true)
      expect(link('sftp://example.com')).toBe(true)
      expect(link('chrome://extensions')).toBe(true)
      expect(link('chrome-extension://example.com')).toBe(true)
      expect(link('view-source:https://example.com')).toBe(true)
      expect(link('about:blank')).toBe(true)
      expect(link('blob:https://example.com/1234567890')).toBe(true)
      expect(link('git+https://example.com/path/to/repo.git')).toBe(true)
      expect(link('ed2k://example.com/path/to/file.ext')).toBe(true)
      expect(link('magnet:?xt=urn:btih:1234567890')).toBe(true)
      expect(link('6.cn')).toBe(true)
    })
  })

  describe('invalid links', () => {
    it('should return false for invalid links', () => {
      expect(link('test')).toBe(false)
      expect(link('256.1.1.1')).toBe(false)
      expect(link('LOCALHOST')).toBe(false)

      // These are valid IPv6 addresses,
      // but since IPv6 addresses can not be accessed directly,
      // they are not valid links.
      expect(link('2001:db8:3333:4444:CCCC:DDDD:EEEE:FFFF')).toBe(false)
      expect(link('::')).toBe(false)
      expect(link('2001:db8::')).toBe(false)
      expect(link('::1234:5678')).toBe(false)
      expect(link('2001:db8::1234:5678')).toBe(false)
      expect(link('2001:0db8:0001:0000:0000:0ab9:C0A8:0102')).toBe(false)
    })
  })
})
