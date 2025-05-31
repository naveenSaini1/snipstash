import { NextResponse } from 'next/server';
import { API_BASE_URL, FOLDERS_PREFIX, API_ENDPOINTS } from '@/constants/endpoints';

export async function DELETE(request, { params }) {
  try {
    const { id } = params; // Get the folder ID from the dynamic route segment

    // Get the token from the incoming request headers
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Authorization token missing or invalid' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];

    // Call your backend /api/folders/deletefolder/{id} endpoint
    const backendResponse = await fetch(`${API_BASE_URL}${FOLDERS_PREFIX}${API_ENDPOINTS.deleteFolder}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Content-Type is usually not needed for DELETE with path variable
      },
    });

    // Forward the backend response status and body to the frontend
    if (!backendResponse.ok) {
      const errorBody = await backendResponse.text(); // Read as text in case of non-JSON error
      console.error(`Backend folder deletion error for ID ${id}:`, backendResponse.status, errorBody);
      return NextResponse.json({ message: 'Failed to delete folder', error: errorBody }, { status: backendResponse.status });
    }

    // Assuming backend returns a success message or similar on success
    const data = await backendResponse.text(); // Read as text as backend returns String
    return NextResponse.json({ message: data || `Folder with ID ${id} deleted successfully` }, { status: backendResponse.status });

  } catch (error) {
    console.error('API route /api/folders/[id] DELETE error:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
} 