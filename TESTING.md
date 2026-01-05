# Testing Guide

This project uses Jest and React Testing Library for testing.

## Setup

Tests are already configured. To run tests:

```bash
npm install
npm test
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Structure

Tests are located alongside the code they test:
- `src/lib/__tests__/` - Utility function tests
- `src/app/api/**/__tests__/` - API route tests
- `src/components/__tests__/` - Component tests

## Writing Tests

### API Route Tests

Example test for an API route:

```typescript
import { POST } from '../route'
import { NextRequest } from 'next/server'

describe('/api/endpoint', () => {
  it('should handle valid requests', async () => {
    const request = new NextRequest('http://localhost:3000/api/endpoint', {
      method: 'POST',
      body: JSON.stringify({ data: 'test' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
  })
})
```

### Component Tests

Example test for a React component:

```typescript
import { render, screen } from '@testing-library/react'
import { ContactForm } from '../ContactForm'

describe('ContactForm', () => {
  it('should render form fields', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })
})
```

## Test Coverage

Current test coverage includes:
- ✅ Email utility functions (validation, sanitization)
- ✅ Contact form API route
- ✅ Quote request API route

## Environment Variables for Testing

Test environment variables are set in `jest.setup.js`. For local testing, you can create a `.env.test.local` file if needed.

## Mocking

External dependencies are mocked in tests:
- Email service providers (Resend, SendGrid)
- Next.js router and navigation
- Environment variables

## Continuous Integration

Tests should run automatically in CI/CD pipelines. Make sure all tests pass before merging PRs.



