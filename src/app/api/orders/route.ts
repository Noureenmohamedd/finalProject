import { NextRequest, NextResponse } from 'next/server';
import getMyToken from '@/utilities/token';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export async function GET(request: NextRequest) {
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
    const decoded: any = jwtDecode(token);
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
  } catch (error: any) {
    console.error('Get orders error:', error);
    
    if (error.response) {
      return NextResponse.json(
        { error: error.response.data.message || 'Failed to fetch orders' },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
