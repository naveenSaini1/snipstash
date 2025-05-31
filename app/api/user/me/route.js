import { NextResponse } from 'next/server';
import { API_BASE_URL, USER_PREFIX, API_ENDPOINTS } from '@/constants/endpoints';

export async function GET(request) {
  try {
    // Get the token from the incoming request headers
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Authorization token missing or invalid' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];

    // Call your backend /user/me endpoint
    const backendResponse = await fetch(`${API_BASE_URL}${USER_PREFIX}${API_ENDPOINTS.me}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Assuming your backend expects this
      },
    });

    // Forward the backend response status and body to the frontend
    if (!backendResponse.ok) {
      const errorBody = await backendResponse.text(); // Read as text in case of non-JSON error
      console.error('Backend /user/me error:', backendResponse.status, errorBody);
      return NextResponse.json({ message: 'Failed to fetch user data', error: errorBody }, { status: backendResponse.status });
    }

    const data = await backendResponse.json();
    return NextResponse.json(data, { status: backendResponse.status });

  } catch (error) {
    console.error('API route /api/user/me error:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
} 