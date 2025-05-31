import { NextResponse } from 'next/server';
import { API_BASE_URL, SNIPPETS_PREFIX } from '@/constants/endpoints';

export async function PUT(request, { params }) {
  const { id } = params; // Get the snippet ID from the URL parameters

  if (!id) {
    return NextResponse.json({ message: 'Snippet ID is required.' }, { status: 400 });
  }

  try {
    // Get the authorization token from the incoming request headers
    const authHeader = request.headers.get('Authorization');
    const token = authHeader ? authHeader.split(' ')[1] : null;

    if (!token) {
      return NextResponse.json({ message: 'Authorization token is required.' }, { status: 401 });
    }

    // Proxy the PUT request to the backend endpoint
    const backendResponse = await fetch(`${API_BASE_URL}${SNIPPETS_PREFIX}/increasecopycount/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Add other necessary headers if your backend expects them (e.g., Content-Type)
        'Content-Type': 'application/json', // Assuming backend expects this header even for PUT without body
      },
      // No body is needed for this specific backend endpoint based on the description
    });

    // Handle response from the backend
    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      console.error(`Backend error increasing copy count for snippet ${id}:`, errorData);
      return NextResponse.json(errorData, { status: backendResponse.status });
    }

    // Assuming the backend returns a success message or updated data
    const responseData = await backendResponse.json();
    return NextResponse.json(responseData, { status: backendResponse.status });

  } catch (error) {
    console.error(`Error in proxy API route for increasing copy count for snippet ${id}:`, error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
} 