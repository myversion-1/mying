import { validateEmail, sanitizeInput } from '../email'

describe('Email Utility Functions', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@example.co.uk')).toBe(true)
      expect(validateEmail('user+tag@example.com')).toBe(true)
    })

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid')).toBe(false)
      expect(validateEmail('invalid@')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
      expect(validateEmail('invalid@example')).toBe(false)
      expect(validateEmail('')).toBe(false)
    })
  })

  describe('sanitizeInput', () => {
    it('should sanitize HTML tags', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;')
      expect(sanitizeInput('<div>test</div>')).toBe('&lt;div&gt;test&lt;&#x2F;div&gt;')
    })

    it('should preserve normal text', () => {
      expect(sanitizeInput('Hello World')).toBe('Hello World')
      expect(sanitizeInput('Test 123')).toBe('Test 123')
    })

    it('should handle special characters', () => {
      expect(sanitizeInput('Test & More')).toBe('Test & More')
      expect(sanitizeInput("It's working")).toBe('It&#x27;s working')
    })

    it('should handle empty strings', () => {
      expect(sanitizeInput('')).toBe('')
    })
  })
})



