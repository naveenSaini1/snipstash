import { NextResponse } from 'next/server';
import { API_BASE_URL, SNIPPETS_PREFIX, API_ENDPOINTS } from '@/constants/endpoints';

export async function DELETE(request, { params }) {
  try {
    const { id } = params; // Get the snippet ID from the dynamic route segment

    // Get the token from the incoming request headers
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Authorization token missing or invalid' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];

    // Call your backend /api/snippets/delete/{id} endpoint
    const backendResponse = await fetch(`${API_BASE_URL}${SNIPPETS_PREFIX}${API_ENDPOINTS.deleteSnippet}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Content-Type is usually not needed for DELETE with path variable
      },
    });

    // Forward the backend response status and body to the frontend
    if (!backendResponse.ok) {
      const errorBody = await backendResponse.text(); // Read as text in case of non-JSON error
      console.error(`Backend snippet deletion error for ID ${id}:`, backendResponse.status, errorBody);
      return NextResponse.json({ message: 'Failed to delete snippet', error: errorBody }, { status: backendResponse.status });
    }

    // Assuming backend returns a success message or similar on success
    const data = await backendResponse.text(); // Read as text as backend returns String
    return NextResponse.json({ message: data || `Snippet with ID ${id} deleted successfully` }, { status: backendResponse.status });

  } catch (error) {
    console.error('API route /api/snippets/[id] DELETE error:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}


export async function PUT(request, { params }) {
  const { id } = params;
  const token = request.headers.get('Authorization');

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const updatedSnippetData = await request.json();

    // Forward the update request to the backend Java API
    
    const backendResponse = await fetch(`${API_BASE_URL}${SNIPPETS_PREFIX}${API_ENDPOINTS.updateSnippet}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token, // Pass the user's token to the backend
      },
      body: JSON.stringify(updatedSnippetData),
    });

    if (!backendResponse.ok) {
      const error = await backendResponse.json();
      console.error('Backend API error during snippet update:', error);
      return NextResponse.json({ message: error.message || 'Failed to update snippet on backend' }, { status: backendResponse.status });
    }

    const result = await backendResponse.json();

    // Assuming the backend returns the updated snippet or success message
    return NextResponse.json(result, { status: backendResponse.status });

  } catch (error) {
    console.error('Error in Next.js API snippet update route:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Optional: Add a GET handler if you need to fetch a single snippet by ID
/*
export async function GET(request, { params }) {
  const { id } = params;
  const token = request.headers.get('Authorization');

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const backendResponse = await fetch(`${BACKEND_API_URL}/snippets/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': token,
      },
    });

    if (!backendResponse.ok) {
      const error = await backendResponse.json();
      console.error('Backend API error during snippet fetch:', error);
      return NextResponse.json({ message: error.message || 'Failed to fetch snippet from backend' }, { status: backendResponse.status });
    }

    const snippet = await backendResponse.json();
    return NextResponse.json(snippet);

  } catch (error) {
    console.error('Error in Next.js API snippet fetch route:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
*/ 