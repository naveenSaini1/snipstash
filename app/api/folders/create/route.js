import { NextResponse } from 'next/server';
import { API_BASE_URL, FOLDERS_PREFIX, API_ENDPOINTS } from '@/constants/endpoints';

export async function POST(request) {
  try {
    // Get the token from the incoming request headers
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Authorization token missing or invalid' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];
 console.log("creating some real stufffff");
    // Get the folder name from the request body
    const { name } = await request.json();
    if (!name) {
        return NextResponse.json({ message: 'Folder name is required' }, { status: 400 });
    }

    // Call your backend /api/folders/createfolder endpoint
    const backendResponse = await fetch(`${API_BASE_URL}${FOLDERS_PREFIX}${API_ENDPOINTS.createFolder}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    // Forward the backend response status and body to the frontend
    if (!backendResponse.ok) {
      const errorBody = await backendResponse.text(); // Read as text in case of non-JSON error
      console.error('Backend folder creation error:', backendResponse.status, errorBody);
      return NextResponse.json({ message: 'Failed to create folder', error: errorBody }, { status: backendResponse.status });
    }

    const data = await backendResponse.json();
    return NextResponse.json(data, { status: backendResponse.status });

  } catch (error) {
    console.error('API route /api/folders/create error:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
} 