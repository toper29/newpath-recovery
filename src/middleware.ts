import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// In-memory store for rate limiting (Disclaimer: In a production environment with multiple server instances, use Redis or similar)
type RateLimitInfo = { count: number; lastReset: number };
type BruteForceInfo = { failedLoginAttempts: number; isBlockedUrl: string; blockExpiresAt: number };

const ipRateLimits = new Map<string, RateLimitInfo>();
const ipLoginLimits = new Map<string, RateLimitInfo>();
const ipRegisterLimits = new Map<string, RateLimitInfo>();
// Store failed logins (tracked by username/IP combo or just IP)
const bruteForceTracker = new Map<string, BruteForceInfo>();

// Maintenance Mode toggle (In reality, fetch from a DB or env var)
let IS_MAINTENANCE_MODE = false;

// Helpers
const MINUTE = 60 * 1000;

function cleanupStaleEntries(map: Map<string, RateLimitInfo>) {
    const now = Date.now();
    for (const [key, value] of map.entries()) {
        if (now - value.lastReset > MINUTE) {
            map.delete(key);
        }
    }
}

// Global cleanup every minute to prevent memory leak
setInterval(() => {
    cleanupStaleEntries(ipRateLimits);
    cleanupStaleEntries(ipLoginLimits);
    cleanupStaleEntries(ipRegisterLimits);
}, MINUTE);


export async function middleware(request: NextRequest) {
    // NextRequest in latest next doesn't expose .ip directly in standard types, use headers
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? '127.0.0.1';
    const path = request.nextUrl.pathname;
    const now = Date.now();

    // 1. Maintenance Mode Gate (Exclude static files, API routes, or admin area so admins can turn it off)
    if (IS_MAINTENANCE_MODE && !path.startsWith('/api') && !path.startsWith('/admin') && !path.startsWith('/_next') && path !== '/maintenance') {
        return NextResponse.redirect(new URL('/maintenance', request.url));
    }

    // Pass through static assets
    if (path.startsWith('/_next') || path.match(/\.(png|jpg|jpeg|gif|svg|ico)$/)) {
        return NextResponse.next();
    }

    // 1.5 Route Protection (Auth & Role Authorization)
    const publicPaths = ['/login', '/register', '/api/auth', '/api/articles', '/api/public'];
    const isPublicPath = publicPaths.some(p => path.startsWith(p));
    
    // We only protect non-public paths
    if (!isPublicPath) {
        const token = request.cookies.get('token')?.value;

        // If it's an API route and no token, return JSON error instead of redirect
        if (!token) {
            if (path.startsWith('/api')) {
                return new NextResponse(
                    JSON.stringify({ success: false, error: 'Unauthorized: No token provided' }),
                    { status: 401, headers: { 'Content-Type': 'application/json' } }
                );
            }
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            const secretStr = process.env.JWT_SECRET;
            if (!secretStr) throw new Error("JWT_SECRET is not configured");
            const secret = new TextEncoder().encode(secretStr);

            const { payload } = await jwtVerify(token, secret);
            const userRole = payload.role as string;

            // Role-based access control for /admin and /api/admin
            if (path.startsWith('/admin') || path.startsWith('/api/admin')) {
                if (userRole !== 'SUPERADMIN' && userRole !== 'ADMIN') {
                    if (path.startsWith('/api')) {
                        return new NextResponse(
                            JSON.stringify({ success: false, error: 'Forbidden: Admin access required' }),
                            { status: 403, headers: { 'Content-Type': 'application/json' } }
                        );
                    }
                    return NextResponse.redirect(new URL('/', request.url));
                }
            }
            
            // For other protected routes, userRole must exist
            if (!userRole) {
                 if (path.startsWith('/api')) {
                    return new NextResponse(
                        JSON.stringify({ success: false, error: 'Unauthorized: Invalid role' }),
                        { status: 401, headers: { 'Content-Type': 'application/json' } }
                    );
                }
                return NextResponse.redirect(new URL('/login', request.url));
            }

        } catch (error) {
            if (path.startsWith('/api')) {
                return new NextResponse(
                    JSON.stringify({ success: false, error: 'Unauthorized: Invalid or expired token' }),
                    { status: 401, headers: { 'Content-Type': 'application/json' } }
                );
            }
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // 2. Global Rate Limiter: 100 req / minute / IP
    let globalInfo = ipRateLimits.get(ip);
    if (!globalInfo || now - globalInfo.lastReset > MINUTE) {
        globalInfo = { count: 1, lastReset: now };
    } else {
        globalInfo.count++;
    }
    ipRateLimits.set(ip, globalInfo);

    if (globalInfo.count > 100) {
        return new NextResponse(
            JSON.stringify({ error: 'Terlalu banyak permintaan (Global Rate Limit) - 100/menit.' }),
            { status: 429, headers: { 'Content-Type': 'application/json' } }
        );
    }

    // 3. Specific Route Rate Limiters (Login & Register APIs/Routes)
    if (path === '/login' && request.method === 'POST') {
        let loginInfo = ipLoginLimits.get(ip);
        if (!loginInfo || now - loginInfo.lastReset > MINUTE) {
            loginInfo = { count: 1, lastReset: now };
        } else {
            loginInfo.count++;
        }
        ipLoginLimits.set(ip, loginInfo);

        if (loginInfo.count > 20) {
            return new NextResponse(
                JSON.stringify({ error: 'Terlalu banyak percobaan login. Coba lagi dalam 1 menit.' }),
                { status: 429, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Brute Force Check
        const bfInfo = bruteForceTracker.get(ip);
        if (bfInfo && bfInfo.failedLoginAttempts >= 5) {
            if (now < bfInfo.blockExpiresAt) {
                const response = NextResponse.next();
                response.headers.set('X-Requires-Captcha', 'true');
                response.headers.set('X-BF-Delay-Seconds', String(Math.ceil((bfInfo.blockExpiresAt - now) / 1000)));
                return response;
            }
        }
    }

    if (path === '/register' && request.method === 'POST') {
        let regInfo = ipRegisterLimits.get(ip);
        if (!regInfo || now - regInfo.lastReset > MINUTE) {
            regInfo = { count: 1, lastReset: now };
        } else {
            regInfo.count++;
        }
        ipRegisterLimits.set(ip, regInfo);

        if (regInfo.count > 10) {
            return new NextResponse(
                JSON.stringify({ error: 'Terlalu banyak percobaan pendaftaran. Coba lagi dalam 1 menit.' }),
                { status: 429, headers: { 'Content-Type': 'application/json' } }
            );
        }
    }

    // Pass through
    const response = NextResponse.next();
    
    // Injects custom headers for rate limit info
    response.headers.set('X-RateLimit-Limit', '100');
    response.headers.set('X-RateLimit-Remaining', String(100 - globalInfo.count));
    
    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
