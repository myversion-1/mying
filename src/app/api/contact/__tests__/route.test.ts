import { POST } from '../route'
import { NextRequest } from 'next/server'
import * as emailLib from '@/lib/email'

// Mock the email library
jest.mock('@/lib/email', () => ({
  sendEmail: jest.fn(),
  validateEmail: jest.fn(),
  sanitizeInput: jest.fn((input: string) => input),
}))

describe('/api/contact', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Default mock implementations
    ;(emailLib.validateEmail as jest.Mock).mockReturnValue(true)
    ;(emailLib.sanitizeInput as jest.Mock).mockImplementation((input: string) => input)
    ;(emailLib.sendEmail as jest.Mock).mockResolvedValue({ success: true, provider: 'test' })
  })

  it('should return 400 if required fields are missing', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        // Missing email, company, message
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('Missing required fields')
  })

  it('should return 400 if email format is invalid', async () => {
    ;(emailLib.validateEmail as jest.Mock).mockReturnValue(false)

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'invalid-email',
        company: 'Test Company',
        message: 'Test message',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid email format')
  })

  it('should successfully process valid contact form submission', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        message: 'Test message',
        phone: '123-456-7890',
        country: 'USA',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.message).toContain('Thank you')
    expect(emailLib.sendEmail).toHaveBeenCalledTimes(1)
  })

  it('should sanitize user inputs', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: '<script>alert("xss")</script>',
        email: 'test@example.com',
        company: 'Test Company',
        message: 'Test message',
      }),
    })

    await POST(request)

    expect(emailLib.sanitizeInput).toHaveBeenCalled()
  })

  it('should handle email sending failures gracefully', async () => {
    ;(emailLib.sendEmail as jest.Mock).mockResolvedValue({
      success: false,
      error: 'Email service unavailable',
    })

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        message: 'Test message',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    // Should still return success to user, but log the error
    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
  })

  it('should handle server errors', async () => {
    ;(emailLib.sendEmail as jest.Mock).mockRejectedValue(new Error('Server error'))

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        message: 'Test message',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toContain('Failed to send message')
  })
})
















