import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

 
    const response = await axios.post(
      'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      { email }
    );

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error('Forgot password error:', error);
    
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response: { data: { message?: string }; status: number } };
      return NextResponse.json(
        { error: axiosError.response.data.message || 'Failed to send reset email' },
        { status: axiosError.response.status }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
