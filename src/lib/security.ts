// Security utilities for XSS and DoS protection

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export function sanitizeHTML(input: string): string {
  if (!input) return ''
  
  // Remove potentially dangerous HTML tags and attributes
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .trim()
}

/**
 * Sanitize user input to prevent injection attacks
 */
export function sanitizeInput(input: string): string {
  if (!input) return ''
  
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate URL format
 */
export function isValidURL(url: string): boolean {
  try {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

/**
 * Rate limiter for preventing DoS attacks
 */
class RateLimiter {
  private requests: Map<string, number[]> = new Map()
  private maxRequests: number
  private windowMs: number

  constructor(maxRequests: number = 10, windowMs: number = 60000) {
    this.maxRequests = maxRequests
    this.windowMs = windowMs
  }

  canMakeRequest(identifier: string): boolean {
    const now = Date.now()
    const windowStart = now - this.windowMs

    // Get existing requests for this identifier
    let requests = this.requests.get(identifier) || []

    // Filter out requests outside the time window
    requests = requests.filter(timestamp => timestamp > windowStart)

    // Check if limit exceeded
    if (requests.length >= this.maxRequests) {
      return false
    }

    // Add current request
    requests.push(now)
    this.requests.set(identifier, requests)

    return true
  }

  getRemainingRequests(identifier: string): number {
    const now = Date.now()
    const windowStart = now - this.windowMs
    const requests = this.requests.get(identifier) || []
    const validRequests = requests.filter(timestamp => timestamp > windowStart)
    return Math.max(0, this.maxRequests - validRequests.length)
  }

  reset(identifier: string): void {
    this.requests.delete(identifier)
  }
}

// Create rate limiters for different endpoints
export const formSubmissionLimiter = new RateLimiter(5, 60000) // 5 requests per minute
export const apiRequestLimiter = new RateLimiter(100, 60000) // 100 requests per minute

/**
 * Generate a random nonce for CSP
 */
export function generateNonce(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

/**
 * Escape special characters to prevent XSS
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

/**
 * Validate and sanitize review text
 */
export function validateReviewText(text: string, maxLength: number = 1000): { valid: boolean; sanitized: string; error?: string } {
  if (!text || text.trim().length === 0) {
    return { valid: false, sanitized: '', error: 'Review text is required' }
  }

  if (text.length < 20) {
    return { valid: false, sanitized: '', error: 'Review must be at least 20 characters' }
  }

  if (text.length > maxLength) {
    return { valid: false, sanitized: '', error: `Review must not exceed ${maxLength} characters` }
  }

  const sanitized = sanitizeInput(text)

  if (sanitized.length < 20) {
    return { valid: false, sanitized: '', error: 'Review contains invalid characters' }
  }

  return { valid: true, sanitized }
}

/**
 * Validate name input
 */
export function validateName(name: string): { valid: boolean; sanitized: string; error?: string } {
  if (!name || name.trim().length === 0) {
    return { valid: false, sanitized: '', error: 'Name is required' }
  }

  if (name.length > 255) {
    return { valid: false, sanitized: '', error: 'Name must not exceed 255 characters' }
  }

  const sanitized = sanitizeInput(name)

  if (sanitized.length < 2) {
    return { valid: false, sanitized: '', error: 'Name must be at least 2 characters' }
  }

  return { valid: true, sanitized }
}

/**
 * Detect potential attack patterns
 */
export function detectAttackPatterns(input: string): boolean {
  const attackPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /eval\(/i,
    /document\./i,
    /window\./i,
    /alert\(/i,
    /prompt\(/i,
    /confirm\(/i,
    /\.\./,
    /\/\*\*\//,
    /union.*select/i,
    /drop.*table/i,
    /delete.*from/i,
    /insert.*into/i,
    /update.*set/i,
    /exec\(/i,
    /system\(/i,
    /shell_exec/i,
    /passthru/i,
    /require\(/i,
    /include\(/i,
  ]

  return attackPatterns.some(pattern => pattern.test(input))
}
