/**
 * Form validation utilities
 * Provides reusable validation functions for forms
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate email address
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || !email.trim()) {
    return {
      isValid: false,
      error: "Email is required",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: "Please enter a valid email address",
    };
  }

  return { isValid: true };
}

/**
 * Validate work email (not personal email domains)
 */
export function validateWorkEmail(email: string, strict: boolean = false): ValidationResult {
  const basicValidation = validateEmail(email);
  if (!basicValidation.isValid) {
    return basicValidation;
  }

  const personalDomains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "icloud.com",
    "mail.com",
    "qq.com",
    "163.com",
    "126.com",
  ];

  const domain = email.split("@")[1]?.toLowerCase();
  if (domain && personalDomains.includes(domain)) {
    return {
      isValid: !strict,
      error: strict
        ? "Please use a work email address"
        : "We recommend using a work email address",
    };
  }

  return { isValid: true };
}

/**
 * Validate required field
 */
export function validateRequired(value: string, fieldName: string = "Field"): ValidationResult {
  if (!value || !value.trim()) {
    return {
      isValid: false,
      error: `${fieldName} is required`,
    };
  }

  return { isValid: true };
}

/**
 * Validate minimum length
 */
export function validateMinLength(
  value: string,
  minLength: number,
  fieldName: string = "Field"
): ValidationResult {
  if (!value || value.trim().length < minLength) {
    return {
      isValid: false,
      error: `${fieldName} must be at least ${minLength} characters`,
    };
  }

  return { isValid: true };
}

/**
 * Validate maximum length
 */
export function validateMaxLength(
  value: string,
  maxLength: number,
  fieldName: string = "Field"
): ValidationResult {
  if (value && value.length > maxLength) {
    return {
      isValid: false,
      error: `${fieldName} must be no more than ${maxLength} characters`,
    };
  }

  return { isValid: true };
}

/**
 * Validate phone number (basic)
 */
export function validatePhone(phone: string, required: boolean = false): ValidationResult {
  if (!phone || !phone.trim()) {
    if (required) {
      return {
        isValid: false,
        error: "Phone number is required",
      };
    }
    return { isValid: true }; // Optional field
  }

  // Basic phone validation (allows international formats)
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  if (!phoneRegex.test(phone) || phone.replace(/\D/g, "").length < 7) {
    return {
      isValid: false,
      error: "Please enter a valid phone number",
    };
  }

  return { isValid: true };
}

/**
 * Validate URL
 */
export function validateUrl(url: string, required: boolean = false): ValidationResult {
  if (!url || !url.trim()) {
    if (required) {
      return {
        isValid: false,
        error: "URL is required",
      };
    }
    return { isValid: true }; // Optional field
  }

  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return {
      isValid: false,
      error: "Please enter a valid URL",
    };
  }
}

/**
 * Validate number
 */
export function validateNumber(
  value: string | number,
  options: {
    min?: number;
    max?: number;
    integer?: boolean;
    required?: boolean;
    fieldName?: string;
  } = {}
): ValidationResult {
  const { min, max, integer = false, required = false, fieldName = "Number" } = options;

  if (!value && value !== 0) {
    if (required) {
      return {
        isValid: false,
        error: `${fieldName} is required`,
      };
    }
    return { isValid: true }; // Optional field
  }

  const num = typeof value === "string" ? Number(value) : value;

  if (isNaN(num)) {
    return {
      isValid: false,
      error: `${fieldName} must be a valid number`,
    };
  }

  if (integer && !Number.isInteger(num)) {
    return {
      isValid: false,
      error: `${fieldName} must be an integer`,
    };
  }

  if (min !== undefined && num < min) {
    return {
      isValid: false,
      error: `${fieldName} must be at least ${min}`,
    };
  }

  if (max !== undefined && num > max) {
    return {
      isValid: false,
      error: `${fieldName} must be no more than ${max}`,
    };
  }

  return { isValid: true };
}

/**
 * Validate multiple fields
 */
export function validateFields(
  fields: Record<string, ValidationResult>
): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  let isValid = true;

  for (const [field, result] of Object.entries(fields)) {
    if (!result.isValid && result.error) {
      errors[field] = result.error;
      isValid = false;
    }
  }

  return { isValid, errors };
}

/**
 * Check if email is a work email (not personal email domains)
 * Returns boolean (true if work email, false if personal)
 */
export function isWorkEmail(email: string): boolean {
  if (!email) return false;
  
  const personalDomains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "icloud.com",
    "mail.com",
    "qq.com",
    "163.com",
    "126.com",
  ];

  const domain = email.split("@")[1]?.toLowerCase();
  return domain ? !personalDomains.includes(domain) : false;
}

