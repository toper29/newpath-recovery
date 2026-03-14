// src/lib/security.ts

/**
 * Validates and sanitizes user input against common injection vectors.
 * Patterns target ACTUAL attack sequences, not individual harmless characters.
 */

// Catch actual SQL injection attack patterns — not individual characters in isolation
// Targets: UNION SELECT, ' OR 1=1, DROP TABLE, exec(), etc.
const SQLI_PATTERN = /((\bunion\b.{0,20}\bselect\b)|(\bselect\b.{0,20}\bfrom\b)|(\binsert\b.{0,20}\binto\b)|(\bdelete\b.{0,20}\bfrom\b)|(\bdrop\b.{0,10}\btable\b)|(\bexec\b\s*\()|(\bexecute\b\s*\()|(--\s*(drop|delete|insert|alter|update|create))|(xp_\w+))/i;

// Catch actual XSS attack vectors — script tags, event handlers, js: protocol
const XSS_PATTERN = /(<script[\s>]|javascript\s*:|vbscript\s*:|on\w+=\s*["']?\w|<iframe[\s>]|<object[\s>]|<embed[\s>])/i;

export interface ValidationResult {
    isValid: boolean;
    sanitizedValue: string;
    threatDetected?: 'SQLI' | 'XSS' | 'NONE';
}

export function sanitizeInput(input: string): ValidationResult {
    if (!input || typeof input !== 'string') {
        return { isValid: true, sanitizedValue: input, threatDetected: 'NONE' };
    }

    let threat: 'SQLI' | 'XSS' | 'NONE' = 'NONE';
    let isClean = true;

    // Check for SQLi
    if (SQLI_PATTERN.test(input)) {
        threat = 'SQLI';
        isClean = false;
    }

    // Check for XSS
    if (XSS_PATTERN.test(input)) {
        threat = threat === 'NONE' ? 'XSS' : threat;
        isClean = false;
    }

    // Basic sanitization: encode HTML entities to prevent execution if rendered
    const sanitized = input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');

    return {
        isValid: isClean,
        sanitizedValue: sanitized,
        threatDetected: threat
    };
}

/**
 * Validates an entire form object and returns threats if any.
 */
export function validateForm(formData: Record<string, string>): { isValid: boolean, threats: string[] } {
    const threats: string[] = [];
    let isValid = true;

    for (const [field, value] of Object.entries(formData)) {
        const { isValid: fieldValid, threatDetected } = sanitizeInput(value);
        if (!fieldValid && threatDetected !== 'NONE') {
            isValid = false;
            threats.push(`${threatDetected} payload detected in field [${field}]`);
        }
    }

    return { isValid, threats };
}

/**
 * Mock function to simulate logging a security alert to the backend/admin console
 */
export async function logSecurityAlert(type: string, details: string, ip: string = 'Unknown') {
    console.warn(`[SECURITY ALERT] Type: ${type} | IP: ${ip} | Details: ${details}`);
    // In a real application, this would send an API request to store the log in the database
}
