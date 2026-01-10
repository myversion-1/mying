import { POST } from '../route'
import { NextRequest } from 'next/server'
import * as emailLib from '@/lib/email'

// Mock the email library
jest.mock('@/lib/email', () => ({
  sendEmail: jest.fn(),
  validateEmail: jest.fn(),
  sanitizeInput: jest.fn((input: string) => input),
}))

describe('/api/quote', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Default mock implementations
    ;(emailLib.validateEmail as jest.Mock).mockReturnValue(true)
    ;(emailLib.sanitizeInput as jest.Mock).mockImplementation((input: string) => input)
    ;(emailLib.sendEmail as jest.Mock).mockResolvedValue({ success: true, provider: 'test' })
  })

  it('should return 400 if required fields are missing', async () => {
    const request = new NextRequest('http://localhost:3000/api/quote', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        // Missing email, company, product, quantity, message
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('Missing required fields')
  })

  it('should return 400 if email format is invalid', async () => {
    ;(emailLib.validateEmail as jest.Mock).mockReturnValue(false)

    const request = new NextRequest('http://localhost:3000/api/quote', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'invalid-email',
        company: 'Test Company',
        product: 'Test Product',
        quantity: '5',
        message: 'Test message',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid email format')
  })

  it('should return 400 if quantity is invalid', async () => {
    const request = new NextRequest('http://localhost:3000/api/quote', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        product: 'Test Product',
        quantity: '-5',
        message: 'Test message',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('Invalid quantity')
  })

  it('should return 400 if quantity is not an integer', async () => {
    const request = new NextRequest('http://localhost:3000/api/quote', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        product: 'Test Product',
        quantity: '5.5',
        message: 'Test message',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('Invalid quantity')
  })

  it('should successfully process valid quote request', async () => {
    const request = new NextRequest('http://localhost:3000/api/quote', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        product: 'Test Product',
        quantity: '10',
        message: 'Test message',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.message).toContain('submitted successfully')
    expect(emailLib.sendEmail).toHaveBeenCalledTimes(1)
  })

  it('should handle email sending failures gracefully', async () => {
    ;(emailLib.sendEmail as jest.Mock).mockResolvedValue({
      success: false,
      error: 'Email service unavailable',
    })

    const request = new NextRequest('http://localhost:3000/api/quote', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        product: 'Test Product',
        quantity: '5',
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

    const request = new NextRequest('http://localhost:3000/api/quote', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        product: 'Test Product',
        quantity: '5',
        message: 'Test message',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toContain('Failed to send quote request')
  })
})












