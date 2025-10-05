import { middleware } from './middleware';
import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// Mock Next.js server and Supabase client
jest.mock('next/server', () => ({
  NextResponse: {
    next: jest.fn(() => ({
      headers: new Headers(),
      redirect: jest.fn(() => ({})),
    })),
    redirect: jest.fn(() => ({})),
  },
}));

jest.mock('@supabase/ssr', () => ({
  createServerClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn(),
    },
  })),
}));

describe('middleware', () => {
  let mockRequest: any;
  let mockResponse: any;
  let mockSupabase: any;

  beforeEach(() => {
    mockRequest = {
      url: 'http://localhost:3000/dashboard',
      nextUrl: {
        pathname: '/',
        origin: 'http://localhost:3000',
      },
      headers: new Headers(),
      cookies: {
        get: jest.fn(),
        set: jest.fn(),
        remove: jest.fn(),
      }
    };
    mockResponse = {
      headers: new Headers(),
      redirect: jest.fn(),
    };
    mockSupabase = {
      auth: {
        getUser: jest.fn(),
      },
    };

    (createServerClient as jest.Mock).mockReturnValue(mockSupabase);
    (NextResponse.next as jest.Mock).mockReturnValue(mockResponse);
    (NextResponse.redirect as jest.Mock).mockReturnValue(mockResponse); // Mock redirect as well
    (NextResponse.redirect as jest.Mock).mockReturnValue(mockResponse); // Mock redirect as well
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test Case 1: Public route access
  it('should allow access to public routes without authentication', async () => {
    mockRequest.nextUrl.pathname = '/login';
    const response = await middleware(mockRequest);
    expect(response).toBe(mockResponse);
    expect(NextResponse.next).toHaveBeenCalledTimes(1);
    expect(createServerClient).not.toHaveBeenCalled();
    expect(mockSupabase.auth.getUser).not.toHaveBeenCalled();
  });

  // Test Case 2: Authenticated user access to protected route
  it('should allow access to protected routes for authenticated users', async () => {
    mockRequest.nextUrl.pathname = '/dashboard';
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'user-123' } } });

    const response = await middleware(mockRequest);

    expect(response).toBe(mockResponse);
    expect(createServerClient).toHaveBeenCalledTimes(1);
    expect(mockSupabase.auth.getUser).toHaveBeenCalledTimes(1);
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });

  // Test Case 3: Unauthenticated user access to protected route
  it('should redirect unauthenticated users to the login page for protected routes', async () => {
    mockRequest.nextUrl.pathname = '/dashboard';
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null } });

    const response = await middleware(mockRequest);

    expect(response).toBe(mockResponse);
    expect(createServerClient).toHaveBeenCalledTimes(1);
    expect(mockSupabase.auth.getUser).toHaveBeenCalledTimes(1);
    expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/login', mockRequest.nextUrl.origin));
  });

  // Test Case 4: Session refresh (getUser called)
  it('should call getUser to refresh the session for protected routes', async () => {
    mockRequest.nextUrl.pathname = '/settings';
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'user-456' } } });

    await middleware(mockRequest);

    expect(createServerClient).toHaveBeenCalledTimes(1);
    expect(mockSupabase.auth.getUser).toHaveBeenCalledTimes(1);
  });

  // Test Case 5: Public API route access
  it('should allow access to public API routes without authentication', async () => {
    mockRequest.nextUrl.pathname = '/api/auth/login';
    const response = await middleware(mockRequest);
    expect(response).toBe(mockResponse);
    expect(NextResponse.next).toHaveBeenCalledTimes(1);
    expect(createServerClient).not.toHaveBeenCalled();
    expect(mockSupabase.auth.getUser).not.toHaveBeenCalled();
  });

  // Test Case 6: Another public route
  it('should allow access to another public route', async () => {
    mockRequest.nextUrl.pathname = '/signup';
    const response = await middleware(mockRequest);
    expect(response).toBe(mockResponse);
    expect(NextResponse.next).toHaveBeenCalledTimes(1);
    expect(createServerClient).not.toHaveBeenCalled();
    expect(mockSupabase.auth.getUser).not.toHaveBeenCalled();
  });
});