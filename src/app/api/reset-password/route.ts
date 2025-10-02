import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, newPassword } = body;

    if (!email || !newPassword) {
      return NextResponse.json(
        { error: 'Email and new password are required' },
        { status: 400 }
      );
    }

    // Call the external API to reset password
    const response = await axios.put(
      'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
      { email, newPassword }
    );

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error('Reset password error:', error);
    
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response: { data: { message?: string }; status: number } };
      return NextResponse.json(
        { error: axiosError.response.data.message || 'Failed to reset password' },
        { status: axiosError.response.status }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
