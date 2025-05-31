import { NextResponse } from 'next/server';
import { API_BASE_URL, FOLDERS_PREFIX, API_ENDPOINTS } from '@/constants/endpoints';

export async function GET(request) {
  try {
    // Get the token from the incoming request headers
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Authorization token missing or invalid' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];

    // Call your backend /api/folders/all endpoint
    const backendResponse = await fetch(`${API_BASE_URL}${FOLDERS_PREFIX}${API_ENDPOINTS.getAllFolders}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Content-Type might be needed depending on your backend setup, usually not for GET
        'Content-Type': 'application/json', // Include if backend expects it
      },
    });

    // Forward the backend response status and body to the frontend
    if (!backendResponse.ok) {
      const errorBody = await backendResponse.text(); // Read as text in case of non-JSON error
      console.error('Backend get all folders error:', backendResponse.status, errorBody);
      return NextResponse.json({ message: 'Failed to fetch folders', error: errorBody }, { status: backendResponse.status });
    }

    const data = await backendResponse.json(); // Assuming backend returns JSON list of folders
    return NextResponse.json(data, { status: backendResponse.status });

  } catch (error) {
    console.error('API route /api/folders/all GET error:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
} 