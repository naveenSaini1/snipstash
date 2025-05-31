import { NextResponse } from 'next/server';
import { API_BASE_URL, SNIPPETS_PREFIX, API_ENDPOINTS } from '@/constants/endpoints';

export async function POST(request) {
  try {
    // Get the token from the incoming request headers
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Authorization token missing or invalid' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];

    // Get the snippet data from the request body
    const snippetData = await request.json();
    if (!snippetData) {
        return NextResponse.json({ message: 'Snippet data is required' }, { status: 400 });
    }

    // Call your backend /api/snippets/create endpoint
    const backendResponse = await fetch(`${API_BASE_URL}${SNIPPETS_PREFIX}${API_ENDPOINTS.createSnippet}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(snippetData), // Send snippet data in the body
    });

    // Forward the backend response status and body to the frontend
    if (!backendResponse.ok) {
      const errorBody = await backendResponse.text(); // Read as text in case of non-JSON error
      console.error('Backend snippet creation error:', backendResponse.status, errorBody);
      return NextResponse.json({ message: 'Failed to create snippet', error: errorBody }, { status: backendResponse.status });
    }

    // Assuming backend returns the created snippet object or its ID
    const data = await backendResponse.json(); 
    return NextResponse.json(data, { status: backendResponse.status });

  } catch (error) {
    console.error('API route /api/snippets/create POST error:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
} 