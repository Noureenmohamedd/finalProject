import { NextRequest, NextResponse } from 'next/server';
import getMyToken from '@/utilities/token';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export async function GET() {
  try {
    // Get the user token
    const token = await getMyToken();
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized - Please login first' },
        { status: 401 }
      );
    }

    // Decode token to get user ID
    const decoded = jwtDecode(token) as { id: string };
    const userId = decoded.id;

    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid token - User ID not found' },
        { status: 401 }
      );
    }

    // Fetch orders from external API
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error('Get orders error:', error);
    
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response: { data: { message?: string }; status: number } };
      return NextResponse.json(
        { error: axiosError.response.data.message || 'Failed to fetch orders' },
        { status: axiosError.response.status }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
