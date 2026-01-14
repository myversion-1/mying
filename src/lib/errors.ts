/**
 * Error handling utilities
 * Provides standardized error handling across the application
 */

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = "AppError";
    
    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export interface ErrorResponse {
  message: string;
  statusCode: number;
  code?: string;
  timestamp?: string;
}

/**
 * Handle unknown errors and convert to AppError
 */
export function handleError(error: unknown): ErrorResponse {
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
      code: error.code,
      timestamp: new Date().toISOString(),
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500,
      timestamp: new Date().toISOString(),
    };
  }

  return {
    message: "An unknown error occurred",
    statusCode: 500,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Create a standardized error response
 */
export function createErrorResponse(
  message: string,
  statusCode: number = 500,
  code?: string
): ErrorResponse {
  return {
    message,
    statusCode,
    code,
    timestamp: new Date().toISOString(),
  };
}


















