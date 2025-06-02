import { NextResponse } from 'next/server';
import { API_BASE_URL, AUTH_PREFIX, API_ENDPOINTS } from '@/constants/endpoints';

const BACKEND_API_URL = process.env.BACKEND_API_URL || API_BASE_URL;

export async function POST(request) {
  try {
    const loginData = await request.json();

    // Forward the login request to the backend API
    const backendResponse = await fetch(`${BACKEND_API_URL}${AUTH_PREFIX}${API_ENDPOINTS.login}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    // Forward the backend response status and body to the frontend
    if (!backendResponse.ok) {
      const error = await backendResponse.json();
      console.error('Backend API error during login:', error);
      return NextResponse.json({ message: error.message || 'Login failed on backend' }, { status: backendResponse.status });
    }

    const result = await backendResponse.json();

    // Assuming the backend returns user data or a success message
    return NextResponse.json(result, { status: backendResponse.status });

  } catch (error) {
    console.error('Error in Next.js API login route:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 